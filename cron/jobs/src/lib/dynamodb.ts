import * as AWS from 'aws-sdk'
import { chunk } from 'lodash'
import { format, startOfDay } from 'date-fns'
import { ImportStatus } from '../models/ImportStatus.enum'

console.log(process.env)

if (process.env.NODE_ENV === 'development') {
  AWS.config.update({
    region: process.env.REGION,
    endpoint: 'http://localhost:8000'
  })
} else {
  AWS.config.update({
    region: process.env.REGION
  })
}

const documentClient = new AWS.DynamoDB.DocumentClient()
const today = format(startOfDay(new Date()), 'MM/dd/yyyy')

// Import the status record so we don't attempt to write the record twice.
export const getImportRecord = async () => {
  console.log('getting import record')
  try {
    const params = {
      TableName: process.env.COVID_IMPORT_RECORD_TABLE_NAME,
      ExpressionAttributeValues: {
        ':importDay': today
      },
      KeyConditionExpression: 'importDay = :importDay',
      Limit: 1
    }

    const response = await documentClient.query(params).promise()

    //return response.Items.some((item) => item.status === ImportStatus.Pending)
    return response.Items
  } catch (e) {
    console.log('there was an error', e)
  }
  return false
}

// this import record will be of pending / completed
export const updateImportRecord = async (status: ImportStatus) => {
  console.log(
    `updating import record to ${status === ImportStatus.Pending ? 'pending' : 'completed'}`
  )

  try {
    const params = {
      TableName: process.env.COVID_IMPORT_RECORD_TABLE_NAME,
      Item: {
        importDay: today,
        status: status
      }
    }
    await documentClient.put(params).promise()
  } catch (e) {
    console.log('there was an error', e)
  }
}

export const putCovidDataBatch = async (covidData) => {
  console.log('putting covid data')
  let mapped = covidData.map((data) => {
    return {
      PutRequest: {
        Item: {
          ...data,
          dateString: data.getDateTimeString(),
          datetime: data.getDateTime()
        }
      }
    }
  })

  let chunked = chunk(mapped, 25)

  try {
    for (const chunk of chunked) {
      const params = {
        RequestItems: {
          [process.env.COVID_DATA_TABLE_NAME]: chunk
        }
      }
      await documentClient.batchWrite(params).promise()
    }
    await updateImportRecord(ImportStatus.Completed)
  } catch (ex) {
    console.error(ex.message)
  }
}
