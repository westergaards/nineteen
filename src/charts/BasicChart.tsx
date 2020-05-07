import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { byCountryTotalAllStatus } from "../utils/covidApi";
import { useCountryStats } from "../App";

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
  },
  legend: {
    enabled: false,
  },
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
  },
  series: [
    {
      type: "area",
      data: [] as any,
    },
  ],
};

export const BasicChart = () => {
  const [value, setValue] = useCountryStats();
  const [chartOptions, setChartOptions] = useState(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const result = await byCountryTotalAllStatus();
      console.log(result);
      setValue(result.data);
    };

    fetchData();
  }, [setValue]);

  useEffect(() => {
    if (value) {
      const newOptions = { ...chartOptions };
      let foo = value.map((f) => {
        return [new Date(f.Date).getTime(), f.Deaths];
      });
      newOptions.series = [
        {
          type: "area",
          data: value.map((f) => {
            return [new Date(f.Date).getTime(), f.Deaths];
          }),
        },
      ];
      console.log(newOptions);
      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
