// Require Logic
var lib = require('./src');

// Lambda Handler
module.exports.handler = function(event, context) {

  lib.runGraphQL(event, function(error, response) {
    return context.done(error, response);
  });
};