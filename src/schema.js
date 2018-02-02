import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
  } from 'graphql';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { createShoe, getLeather, getShoe, getpolish } from './dynamo';

const Polish = new GraphQLObjectType({
    name: 'Polish',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: GraphQLString },
        colour: { type: GraphQLString }
    })
});

const Leather = new GraphQLObjectType({
    name: 'Leather',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        monthsBetweenCleans: { type: GraphQLInt },
        wearsBetweenCleans: { type: GraphQLInt },
    })
});

const Shoe = new GraphQLObjectType({
    name: "Shoe",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        imageUrl: { type: GraphQLString},
        numberOfWears: { type: GraphQLInt},
        dateLastFullClean: { type: GraphQLString},
        dateLastSemiClean: { type: GraphQLString},
        leather: { 
            type: new GraphQLNonNull(Leather),
            resolve: function({leather}) {
                return getLeather(leather)
            } 
        },
        polish: { 
            type: new GraphQLNonNull(Polish),
            resolve: function({polish}) {
                return getPolish(polish)
            }
        }
    }),
});

const Query = new GraphQLObjectType({
      name: 'ShoeSchema',
      fields: {
        shoe: { 
          args: { shoeId: { type: GraphQLString } },
          type: new GraphQLObjectType(Shoe),
          resolve: (parent, args) => getShoe(args.shoeId)
        },
      },
}); 
const Mutation = new GraphQLObjectType({
      name: 'ShoeMutations', // an arbitrary name
      fields: {
        addShoe: {
            type: Shoe,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString},
                imageUrl: { type: GraphQLString},
                numberOfWears: { type: GraphQLInt},
                dateLastFullClean: { type: GraphQLString},
                dateLastSemiClean: { type: GraphQLString},
                leather: { type: GraphQLString },
                polish: { type: GraphQLString}
            },
            resolve: function(source, args) {
                return createShoe(args);
            }
        }
      }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutuation
  });

export default Schema;