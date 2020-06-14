import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { getCovidDataHistorical, getCovidDataAllHistorical } from './service/dynamodb'

const response = (message, status = 200) => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(
      {
        message
      },
      null,
      2
    )
  }
}

export const getState: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log(event)
    let state = event.multiValueQueryStringParameters.state
    if (!state) {
      throw new Error('Missing State Parameter')
    }
    const results = await getCovidDataHistorical(state[0])
    return response(results, 200)
  } catch (e) {
    return response(e.message, 500)
  }
}

export const getStates: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log(event)
    const results = await getCovidDataAllHistorical()
    return response(results, 200)
  } catch (e) {
    return response(e.message, 500)
  }
}
