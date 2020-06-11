import React, { useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMount } from "react-use";
import darkUnica from "highcharts/themes/dark-unica";
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
  yAxis: {
    gridLineWidth: 0,
    visible: false,
    min: 0,
  },
  legend: {
    enabled: false,
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
    },
  ],
};

export const BarChart = (props: HighchartsReact.Props) => {
  const [chartOptions, setChartOptions] = useState(options);
  const [showChart, setShowChart] = useState(false);

  useMount(async () => {
    try {
      let result = await axios.get(
        `https://t5ozqw55je.execute-api.us-east-1.amazonaws.com/dev/state/search?state=${props.state}`
      );
      let states = result.data.message;

      let filtered = states
        .filter((s) => s.state === props.state)
        .sort((a, b) => a.datetime - b.datetime);

      let positiveIncrease = filtered.map((f) => {
        return [f.datetime, f.positiveIncrease || 0];
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
          name: props.state,
          data: positiveIncrease,
          color: color,
          borderColor: color,
          pointWidth: 2,
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
    } catch (e) {
      console.log("there was an error", e);
    }
  });
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
