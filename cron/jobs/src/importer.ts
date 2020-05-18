import axios from 'axios'
import { plainToClass } from 'class-transformer'
import { startOfDay, format } from 'date-fns'
import CovidData from './models/CovidData.model'
import { FetchError } from './errors/error'
import { ImportStatus } from './models/ImportStatus.enum'
import { updateImportRecord, getImportRecord, putCovidDataBatch } from './lib/dynamodb'

const dailyStatsUrl = 'https://covidtracking.com/api/v1/states/daily.json'
const currentStatsUrl = 'https://covidtracking.com/api/v1/states/current.json'

// Convert data to classes for consumption
export const mapDataToClass = (data) => {
  return plainToClass(CovidData, data)
}

export const fetchHistoricalStateData = async () => {
  try {
    let result = await axios.get(dailyStatsUrl)
    return result.data
  } catch (e) {
    throw new FetchError(e)
  }
}

export const fetchCurrentStateData = async () => {
  try {
    let result = await axios.get(currentStatsUrl)
    return result.data
  } catch (e) {
    throw new FetchError(e)
  }
}

// This should only be called once.
export const importHistoricalStateData = async () => {
  try {
    let requiresData = await getImportRecord()
    console.log('requiresData', requiresData)

    if (!requiresData.length) {
      console.log('update import record to P')

      await updateImportRecord(ImportStatus.Pending)

      let data = await fetchHistoricalStateData()
      await putCovidDataBatch(mapDataToClass(data))
      return
    }

    console.log(
      `Import process is ${
        requiresData[0].status === ImportStatus.Pending ? 'pending' : 'completed'
      }`
    )
    return
  } catch (ex) {
    throw new Error(`importing historical data failed. ${ex}`)
  }
}

// This should only be called everytime the api is hit.. .
export const importCurrentStateData = async () => {
  try {
    console.log('update import record to P')

    await updateImportRecord(ImportStatus.Pending)

    let data = await fetchHistoricalStateData()
    data = data.filter((item) => item.date === parseInt(format(startOfDay(new Date()), 'yyyyMMdd')))

    let transformedData = mapDataToClass(data)

    await putCovidDataBatch(transformedData)
    return
  } catch (ex) {
    throw new Error(`importing current state data failed. ${ex}`)
  }
}
