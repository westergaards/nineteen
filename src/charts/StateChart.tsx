import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAllStatesByTime } from "../utils/covidApi";
import { State, useStateStats } from "../App";

const highChartOptions = Highcharts.getOptions();
const color =
  highChartOptions && Array.isArray(highChartOptions.colors)
    ? highChartOptions.colors[0]
    : "rgb(255, 255, 255)";

const options = {
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

export const StateChart = (props: { state: string }) => {
  const [states, setStates] = useStateStats();
  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    if (states) {
      const newOptions = { ...chartOptions, title: { text: props.state } };

      newOptions.series = [
        {
          type: "area",
          data: states
            .filter((s) => s.Province === props.state)
            .map((f) => {
              return [new Date(f.Date).getTime(), f.Deaths];
            }),
        },
      ];

      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
