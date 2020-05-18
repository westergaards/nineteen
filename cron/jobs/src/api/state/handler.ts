import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { importHistoricalStateData, importCurrentStateData } from '../../importer'

export const importHistorical: APIGatewayProxyHandler = async (event, _context) => {
  try {
    await importHistoricalStateData()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'State Historical Data Imported!'
        },
        null,
        2
      )
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: e.message
        },
        null,
        2
      )
    }
  }
}

export const importCurrent: APIGatewayProxyHandler = async (event, _context) => {
  try {
    await importCurrentStateData()
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'State Current Data Imported!'
        },
        null,
        2
      )
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: e.message
        },
        null,
        2
      )
    }
  }
}
