import * as AWS from 'aws-sdk'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'

let configurationOptions: ServiceConfigurationOptions = {
  region: 'us-east-1'
}

console.log('process env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  //configurationOptions.endpoint = 'http://localhost:8000'
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

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const getCovidDataAllHistorical = async (): Promise<any> => {
  try {
    const params = {
      TableName: 'covid-data',
      ExpressionAttributeNames: {
        '#state': 'state',
        '#date': 'date',
        '#datetime': 'datetime'
      },
      ProjectionExpression:
        '#state, #date, #datetime, deathIncrease, positiveIncrease, hospitalizedIncrease, totalTestResultsIncrease, hospitalizedCurrently, inIcuCurrently, onVentilatorCurrently',
      ExclusiveStartKey: null
    }
    console.log('the params', params)
    let results = []
    let result = await dynamo.scan(params).promise()
    results = [...result.Items]
    console.log('results.length', results.length)

    while (result.LastEvaluatedKey) {
      console.log(result.LastEvaluatedKey)
      params.ExclusiveStartKey = result.LastEvaluatedKey
      result = await dynamo.scan(params).promise()
      results = [...results, ...result.Items]
      console.log('results.length', results.length)
    }

    let mappedResults = groupBy(results, 'state')
    return mappedResults
  } catch (e) {
    console.log('there was an error,', e)
  }
}
