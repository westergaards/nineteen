import * as AWS from 'aws-sdk'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'

let configurationOptions: ServiceConfigurationOptions = {
  region: 'us-east-1'
}

console.log('process env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  configurationOptions.endpoint = 'http://localhost:8000'
  AWS.config.update(configurationOptions)
} else {
  AWS.config.update(configurationOptions)
}

const dynamo = new AWS.DynamoDB.DocumentClient()

export const getCovidDataHistorical = async (state: string): Promise<any> => {
  try {
    const params = {
      TableName: 'covid-data',
      ExpressionAttributeNames: {
        '#state': 'state'
      },
      KeyConditionExpression: '#state = :state',
      ExpressionAttributeValues: {
        ':state': state
      }
    }
    console.log('the params', params)
    let result = await dynamo.query(params).promise()
    return result.Items || []
  } catch (e) {
    console.log('there was an error,', e)
  }
}
