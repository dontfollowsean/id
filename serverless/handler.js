'use strict'
const uuid = require('uuid')
const dynamoDb = require('./dynamodb')

// Add User to DB
const createUser = (internalIp, externalIp, callback) => {
  const putParams = {
    TableName: process.env.DYNAMODB_TABLE, // Environment variable defined in serverless.yml
    Item: {
      userId: uuid.v1(),
      extIp: externalIp,
      intIp: internalIp
    }
  }
  dynamoDb.put(putParams, (error) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  
        },
        body: {
          'message': 'Cannot get user',
          'error': error
        }
      })
      return
    }
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(putParams.Item)
    }
    callback(null, response)
  })
}

// Get User from DB
module.exports.getUserId = (event, context, callback) => {
  const externalIp = event.requestContext.identity.sourceIp || '0.0.0.0'
  const internalIp = event.headers.internalip || '0.0.0.0'

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      'extIp': externalIp,
      'intIp': internalIp
    }
  }
  dynamoDb.get(params, (error, result) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: {
          'message': 'Cannot get user',
          'error': error
        }
      })
      return
    }

    if (result.Item) {
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result.Item)
      }
      callback(null, response)
    } else {
      createUser(internalIp, externalIp, callback) // If IP combination doesn't exist, add to db
    }
  })
}
