class CovidData {
  date: number
  state: string
  positive: number
  negative: number
  pending?: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dataQualityGrade: string
  lastUpdateEt: string
  hash: string
  dateChecked: string
  death: number
  hospitalized: number
  total: number
  totalTestResults: number
  posNeg: number
  fips: string
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number

  getDate() {
    let dateString = this.date.toString()

    return new Date(
      dateString.slice(0, 4) +
        '/' +
        dateString.slice(4, dateString.length - 2) +
        '/' +
        dateString.slice(6, dateString.length)
    )
  }

  getDateTimeString() {
    return this.getDate().toDateString()
  }

  getDateTime() {
    return this.getDate().getTime()
  }
}

export default CovidData
