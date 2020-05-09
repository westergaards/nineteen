import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useStateStats } from "./StateChartWrapper";

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
      text: "Testing",
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
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y:,.0f}</b>",
  },
  series: [
    {
      name: "deaths",
      type: "area",
      data: [] as any,
    },
  ],
};

export const StateTestChart = (props: { state: string }) => {
  const [states] = useStateStats();
  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    if (states) {
      const newOptions = { ...chartOptions, title: { text: props.state } };
      console.log("states", states);
      let filtered = states
        .filter((s) => s.state === props.state)
        .sort((a, b) => a.datetime - b.datetime);

      let totalTestResults = filtered.map((f) => {
        return [f.datetime, f.totalTestResults || 0];
      });

      let totalNegativeTestResultsData = filtered.map((f) => {
        return [f.datetime, f.negative || 0];
      });

      let totalPositiveTestResultsData = filtered.map((f) => {
        return [f.datetime, f.positive || 0];
      });

      console.log("stateData");

      newOptions.series = [
        {
          name: "Total Test Results",
          type: "area",
          data: totalTestResults,
        },
        {
          name: "Negative Test Results",
          type: "area",
          data: totalNegativeTestResultsData,
        },
        {
          name: "Positive Test Results",
          type: "area",
          data: totalPositiveTestResultsData,
        },
      ];

      if (props.state === "KS") {
        console.log(filtered);
      }

      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
