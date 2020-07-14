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
      visible: true,
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
  plotOptions: {},
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

export const HospitalBarChart = (props: HighchartsReact.Props) => {
  const [chartOptions, setChartOptions] = useState(options);
  const [showChart, setShowChart] = useState(false);
  const [states] = useStateStats();

  useEffect(() => {
    if (states[props.state]) {
      let filtered = states[props.state].sort(
        (a, b) => a.datetime - b.datetime
      );

      /* redo this */
      let data = filtered.map((f) => {
        return {
          totalTestResultsIncrease: [
            f.datetime,
            f.totalTestResultsIncrease || 0,
          ],
          hospitalized: [f.datetime, f.hospitalizedCurrently || 0],
          inICU: [f.datetime, f.inIcuCurrently || 0],
          onVentilator: [f.datetime, f.onVentilatorCurrently || 0],
        };
      });

      const newOptions = {
        ...chartOptions,
        title: {
          ...chartOptions.title,
          useHTML: true,
          text: `<div style="display: flex; flex-direction: column;">
              <div style="display: flex; font-size: 22px; justify-content: center;">
                <b>${props.state}</b>
              </div>
            </div>`,
        },
      };

      newOptions.series = [
        {
          name: "tests",
          type: "column",
          data: data.map((f) => f.totalTestResultsIncrease),
          color: "#c3c3c3",
          borderColor: "#c3c3c3",
          opacity: 0.5,
          pointWidth: 2,
          yAxis: 1,
          visible: true,
        },
        {
          name: "hospitialized",
          type: "line",
          data: data.map((f) => f.hospitalized),
          color: "#2a9d8f",
          borderColor: "#2a9d8f",
          pointWidth: 2,
          yAxis: 0,
          opacity: 1,
          visible: true,
        },
        {
          name: "in ICU",
          type: "spline",
          data: data.map((f) => f.inICU),
          color: "#e9c46aff",
          borderColor: "#e9c46aff",
          pointWidth: 2,
          yAxis: 2,
          opacity: 1,
          visible: true,
        },
        {
          name: "on Ventilator",
          type: "spline",
          data: data.map((f) => f.onVentilator),
          color: "#f4a261ff",
          borderColor: "#f4a261ff",
          pointWidth: 2,
          yAxis: 2,
          opacity: 1,
          visible: true,
        },
      ];

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
