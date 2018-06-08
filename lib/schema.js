'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _dynamo = require('./dynamo');

var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB.DocumentClient();


var Polish = new _graphql.GraphQLObjectType({
    name: 'Polish',
    fields: function fields() {
        return {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            brand: { type: _graphql.GraphQLString },
            colour: { type: _graphql.GraphQLString }
        };
    }
});

var Leather = new _graphql.GraphQLObjectType({
    name: 'Leather',
    fields: function fields() {
        return {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            name: { type: _graphql.GraphQLString },
            monthsBetweenCleans: { type: _graphql.GraphQLInt },
            wearsBetweenCleans: { type: _graphql.GraphQLInt }
        };
    }
});

var Shoe = new _graphql.GraphQLObjectType({
    name: "Shoe",
    fields: function fields() {
        return {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            name: { type: _graphql.GraphQLString },
            imageUrl: { type: _graphql.GraphQLString },
            numberOfWears: { type: _graphql.GraphQLInt },
            dateLastFullClean: { type: _graphql.GraphQLString },
            dateLastSemiClean: { type: _graphql.GraphQLString },
            leather: {
                type: new _graphql.GraphQLNonNull(Leather),
                resolve: function resolve(_ref) {
                    var leather = _ref.leather;

                    return (0, _dynamo.getLeather)(leather);
                }
            },
            polish: {
                type: new _graphql.GraphQLNonNull(Polish),
                resolve: function resolve(_ref2) {
                    var polish = _ref2.polish;

                    return getPolish(polish);
                }
            }
        };
    }
});

var Query = new _graphql.GraphQLObjectType({
    name: 'ShoeSchema',
    fields: {
        shoe: {
            args: { shoeId: { type: _graphql.GraphQLString } },
            type: Shoe,
            resolve: function resolve(parent, args) {
                return (0, _dynamo.getShoe)(args.shoeId);
            }
        }
    }
});
var Mutation = new _graphql.GraphQLObjectType({
    name: 'ShoeMutations', // an arbitrary name
    fields: {
        addShoe: {
            type: Shoe,
            args: {
                id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                name: { type: _graphql.GraphQLString },
                imageUrl: { type: _graphql.GraphQLString },
                numberOfWears: { type: _graphql.GraphQLInt },
                dateLastFullClean: { type: _graphql.GraphQLString },
                dateLastSemiClean: { type: _graphql.GraphQLString },
                leather: { type: _graphql.GraphQLString },
                polish: { type: _graphql.GraphQLString }
            },
            resolve: function resolve(source, args) {
                return (0, _dynamo.createShoe)(args);
            }
        }
    }
});

var Schema = new _graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation
});

exports.default = Schema;