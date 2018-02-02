import AWS from 'aws-sdk';
const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};
const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const shoesTable = projectName + '-shoes-' + stage;
const leatherTable = projectName + '-leathers-' + stage;
const polishTable = projectName + '-polish-' + stage;

export function createShoe(shoe) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: shoesTable,
      Item: shoe
    };

    docClient.put(params, function(err, data) {
      if (err) return reject(err);
      return resolve(post);
    });

  });
}

export function getShoe(id) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: shoes,
      Key:{ id: id },
      AttributesToGet: [
        'id',
        'name',
        'imageUrl',
        'numnberOfWears',
        'dateLastFullClean',
        'dateLastSemiClean',
        'leather',
        'polish'
      ]
    };

    docClient.scan(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

export function getLeather(id) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: leatherTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'name',
        'monthsBetweenCleans',
        'wearsBetweenCleans'
      ]
    };

    docClient.get(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

export function getPolish(id) {
    return new Promise(function(resolve, reject) {
      var params = {
        TableName: polishTable,
        Key: {
          id: id
        },
        AttributesToGet: [
          'id',
          'brand',
          'colour'
        ]
      };
  
      docClient.get(params, function(err, data) {
        if (err) return reject(err);
        return resolve(data["Item"]);
      });
  
    });
  }
  
