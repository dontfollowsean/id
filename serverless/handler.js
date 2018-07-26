'use strict';
const uuid = require('uuid')
const dynamoDb = require('./dynamodb')


const createUser = (internalIp, externalIp, callback) => {
  const putParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      userId: uuid.v1(),
      extIp: externalIp,
      intIp: internalIp
    }
  }
  dynamoDb.put(putParams, (error) => {
    if (error) {
      // console.log('Put Error: ' + error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'application/json'},
        body: {
          'message': 'Cannot get user',
          'error': error
        }
      })
      return
    }
    // console.log('New User: {' + internalIp + ', ' + externalIp + ', ' + putParams.Item.userId + '}')
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(putParams.Item)
    }
    callback(null, response)
  })
}

module.exports.getUserId = (event, context, callback) => {
  const externalIp = event.requestContext.identity.sourceIp || '0.0.0.0'
  const internalIp = event.headers.internalIp || '0.0.0.0'
  // console.log('External IP ' + externalIp)
  // console.log('Internal IP ' + internalIp)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      'extIp': externalIp,
      'intIp': internalIp
    }
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      // console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'application/json' },
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
        headers: {'Content-Type': 'application/json'},
        body:  JSON.stringify(result.Item)
      }
      callback(null, response)
    } else {
      // console.log('User unrecognized. Create user with: {' + internalIp + ', ' + externalIp + '}')
      createUser(internalIp, externalIp, callback)
    }
  })
}
