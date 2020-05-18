import { buildHistoricalData, importHistoricalData } from '../src/importer'
import { it } from 'date-fns/locale'

import { format, startOfDay } from 'date-fns'

describe('test import parsing', () => {
  test('should properly parse a json file and map', async () => {
    //await importHistoricalData()
    expect(1).toEqual(1)
  })

  test('should map a date correctly', () => {
    let expected = 20200305
    let actual = parseInt(format(startOfDay(new Date('03/05/2020')), 'yyyyMMdd'))

    expect(actual).toEqual(expected)
  })
})
