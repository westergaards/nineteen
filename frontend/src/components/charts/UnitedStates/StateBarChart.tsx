/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import darkUnica from "highcharts/themes/dark-unica";
import { useStateStats } from "../../../App";
darkUnica(Highcharts);

const options = {
  chart: {
    type: "column",
    zoomType: "x",
    height: 300,
    backgroundColor: "#000",
  },
  title: {
    verticalAlign: "bottom",
  },
  xAxis: {
    type: "datetime",
  },
  yAxis: [
    {
      gridLineWidth: 0,
      visible: false,
      min: 0,
      text: "p",
    },
    {
      gridLineWidth: 0,
      visible: false,
      min: 0,
      text: "t",
    },
    {
      gridLineWidth: 0,
      visible: false,
      min: 0,
      text: "pe",
    },
  ],
  legend: {
    enabled: true,
  },
  plotOptions: {
    // spline: {
    //   lineWidth: 4,
    //   marker: {
    //     enabled: false,
    //   },
    // },
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y:,.0f}</b>",
  },
  series: [
    {
      name: "",
      data: [] as any,
      color: "",
      pointWidth: 20,
      borderColor: "",
      type: "",
      yAxis: 0,
      opacity: 1,
      visible: false,
    },
  ],
};

export const StateBarChart = (props: HighchartsReact.Props) => {
  const [chartOptions, setChartOptions] = useState(options);
  const [showChart, setShowChart] = useState(false);
  const [states] = useStateStats();

  useEffect(() => {
    console.log("states", states);
    if (states[props.state]) {
      console.log("states", states);
      console.log(states[props.state]);

      let filtered = states[props.state].sort(
        (a, b) => a.datetime - b.datetime
      );

      /* redo this */
      let totalTestResultsIncrease = filtered.map((f) => {
        return [f.datetime, f.totalTestResultsIncrease || 0];
      });

      let positiveIncrease = filtered.map((f) => {
        return [f.datetime, f.positiveIncrease || 0];
      });

      let percentPositive = totalTestResultsIncrease.map((testIncrease) => {
        let percent = 0;
        let matchingPositiveIncrease = positiveIncrease.find(
          (positive) => positive[0] === testIncrease[0]
        );

        if (matchingPositiveIncrease) {
          percent = (matchingPositiveIncrease[1] / testIncrease[1]) * 100;
        }
        return [testIncrease[0], percent];
      });

      // // latest result > or < 10 day average
      let averageSlice = filtered.slice(
        filtered.length - 11,
        filtered.length - 1
      );

      const arrAvg = (arr) =>
        arr.reduce((a, b) => a + b.positiveIncrease, 0) / arr.length;

      let average = arrAvg(averageSlice);
      let lastIndex = positiveIncrease[positiveIncrease.length - 1][1];
      let color = lastIndex > average ? "#E63946" : "#06d6a0";

      const newOptions = {
        ...chartOptions,
        title: {
          ...chartOptions.title,
          useHTML: true,
          text: `<div style="display: flex; flex-direction: column;">
              <div style="display: flex; font-size: 22px; justify-content: center;">
                <b>${props.state}</b>
              </div>
              <div style="display: flex; font-size: 18px; justify-content: center; font-weight: 600;"">
              ${lastIndex} / ${average}
              </div>
              <div style="display: flex; font-size: 14px; justify-content: center; font-weight: 600;">
                (yesterday vs 10 day avg)
              </div>
            </div>`,
        },
      };

      newOptions.series = [
        {
          name: "positive",
          type: "line",
          data: positiveIncrease,
          color: color,
          borderColor: color,
          pointWidth: 2,
          yAxis: 0,
          opacity: 1,
          visible: false,
        },
        {
          name: "tests",
          type: "column",
          data: totalTestResultsIncrease,
          color: "#c3c3c3",
          borderColor: "#c3c3c3",
          opacity: 0.5,
          pointWidth: 2,
          yAxis: 1,
          visible: true,
        },
        {
          name: "% positive",
          type: "spline",
          data: percentPositive,
          color: "#f4a261ff",
          borderColor: "#f4a261ff",
          pointWidth: 2,
          yAxis: 2,
          opacity: 1,
          visible: true,
        },
      ];
      // newOptions.series = [
      //   {
      //     name: "positiveIncrease",
      //     // type: "spline",
      //     data: positiveIncrease,
      //     visible: true,
      //     color: "#E63946",
      //     lineWidth: 3,
      //     crisp: false,
      //     enableMouseTracking: false,
      //   },
      // ];

      setChartOptions(newOptions);
      setShowChart(true);
    }
  }, [props.state, states]);
  return (
    <Box>
      {!showChart ? (
        <Box
          height={300}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "#000" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  );
};
