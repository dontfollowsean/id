'use strict';
const uuid = require('uuid')
const dynamoDb = require('./dynamodb')

module.exports.getUserId = (event, context, callback) => {



  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get User',
      input: event,
    }),
  };
  callback(null, response);

}
