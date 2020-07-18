import React, { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { CircularProgress, Box } from '@material-ui/core'
import { byCountryTotalAllStatus } from '../../utils/covidApi'
import { useCountryStats } from '../../App'
import darkUnica from 'highcharts/themes/dark-unica'
import AnnotationsModule from 'highcharts/modules/annotations'

AnnotationsModule(Highcharts)
darkUnica(Highcharts)

const options = {
  chart: {
    type: 'column',
    zoomType: 'x',
    height: 300,
    backgroundColor: '#000'
  },
  title: {
    text: 'US Deaths by Day',
    style: {
      fontSize: '20px'
    }
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    gridLineWidth: 0,
    visible: true,
    min: 0,
    title: 'total'
  },
  legend: {
    enabled: true
  },
  plotOptions: {
    spline: {
      lineWidth: 4,
      marker: {
        enabled: false
      }
    }
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
  },
  series: [
    {
      name: '',
      data: [] as any,
      color: '#E63946',
      borderColor: '',
      visible: true,
      type: '',
      opacity: 1,
      pointWidth: 2
    }
  ]
}

export const CountryChart = () => {
  const [value, setValue] = useCountryStats()
  const [chartOptions, setChartOptions] = useState<any>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const result = await byCountryTotalAllStatus()
      setValue(result.data)
    }

    fetchData()
  }, [setValue])

  useEffect(() => {
    if (value) {
      const newOptions = { ...options }

      let series = value
        .filter((a) => a.Date > '2020-03-09T00:00:00Z')
        .filter((a) => a.Deaths !== 0)
        .map((a, b, arr) => {
          let previousDeathValue = 0
          let previousConfirmedValue = 0
          let deathDelta = 0
          let confirmedDelta = 0

          if (typeof arr[b - 1] === 'object') {
            previousDeathValue = arr[b - 1].Deaths
            previousConfirmedValue = arr[b - 1].Confirmed

            let currentDeathValue = arr[b].Deaths
            let currentConfirmedValue = arr[b].Confirmed

            deathDelta =
              currentDeathValue > previousDeathValue
                ? currentDeathValue - previousDeathValue
                : previousDeathValue

            confirmedDelta =
              currentConfirmedValue > previousConfirmedValue
                ? currentConfirmedValue - previousConfirmedValue
                : previousConfirmedValue
          }

          return {
            death: [new Date(a.Date).getTime(), deathDelta],
            positive: [new Date(a.Date).getTime(), confirmedDelta]
          }
        })

      newOptions.series = [
        {
          name: 'deaths',
          type: 'spline',
          data: series.map((d) => d.death),
          color: '#E63946',
          borderColor: '#E63946',
          opacity: 1,
          pointWidth: 2,
          visible: true
        },
        {
          name: 'positive',
          type: 'column',
          data: series.map((d) => d.positive),
          color: '#c3c3c3',
          borderColor: '#c3c3c3',
          opacity: 0.5,
          pointWidth: 2,
          visible: true
        }
      ]

      setChartOptions(newOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Box pt={2}>
      {!chartOptions ? (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '316px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  )
}
