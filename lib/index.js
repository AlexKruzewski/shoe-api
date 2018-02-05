'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runGraphQL = runGraphQL;

var _graphql = require('graphql');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runGraphQL(event, cb) {

  var query = event.query;

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  (0, _graphql.graphql)(_schema2.default, query).then(function (result) {
    //console.log('RESULT: ', result);
    return cb(null, result);
  });
}