'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShoe = createShoe;
exports.getShoe = getShoe;
exports.getLeather = getLeather;
exports.getPolish = getPolish;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
};
var docClient = new _awsSdk2.default.DynamoDB.DocumentClient(dynamoConfig);
var stage = process.env.SERVERLESS_STAGE;
var projectName = process.env.SERVERLESS_PROJECT;
var shoesTable = projectName + '-shoes-' + stage;
var leatherTable = projectName + '-leathers-' + stage;
var polishTable = projectName + '-polish-' + stage;

function createShoe(shoe) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: shoesTable,
      Item: shoe
    };

    docClient.put(params, function (err, data) {
      if (err) return reject(err);
      return resolve(post);
    });
  });
}

function getShoe(id) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: shoes,
      Key: { id: id },
      AttributesToGet: ['id', 'name', 'imageUrl', 'numnberOfWears', 'dateLastFullClean', 'dateLastSemiClean', 'leather', 'polish']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}

function getLeather(id) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: leatherTable,
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'name', 'monthsBetweenCleans', 'wearsBetweenCleans']
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });
  });
}

function getPolish(id) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: polishTable,
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'brand', 'colour']
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });
  });
}