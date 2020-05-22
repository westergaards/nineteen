import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Box } from "@material-ui/core";
import { byCountryTotalAllStatus } from "../../utils/covidApi";
import { useCountryStats } from "../../App";

import AnnotationsModule from "highcharts/modules/annotations";
AnnotationsModule(Highcharts);

const highChartOptions = Highcharts.getOptions();
const color =
  highChartOptions && Array.isArray(highChartOptions.colors)
    ? highChartOptions.colors[0]
    : "rgb(255, 255, 255)";

const options = {
  title: {
    text: "US Deaths by Day",
  },
  chart: {
    zoomType: "x",
  },
  xAxis: {
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "Deaths",
    },
    min: 0,
  },
  legend: {
    enabled: false,
  },

  annotations: [
    {
      labels: [] as any,
    },
  ],
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, color],
          [1, Highcharts.color(color).setOpacity(0).get("rgba")],
        ],
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
    series: {},
  },
  series: [
    {
      name: "deaths",
      type: "area",
      data: [] as number[][],
    },
  ],
};

export const CountryChart = () => {
  const [value, setValue] = useCountryStats();
  const [chartOptions, setChartOptions] = useState<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const result = await byCountryTotalAllStatus();
      setValue(result.data);
    };

    fetchData();
  }, [setValue]);

  useEffect(() => {
    if (value) {
      const newOptions = { ...options };
      let series = value.map((f) => {
        return [new Date(f.Date).getTime(), f.Deaths];
      });

      newOptions.series = [
        {
          name: "deaths",
          type: "area",
          data: series,
        },
      ];

      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <Box pt={2}>
        {!chartOptions ? (
          <CircularProgress />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </Box>
    </div>
  );
};
