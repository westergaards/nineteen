import React, { useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMount } from "react-use";
import darkUnica from "highcharts/themes/dark-unica";
darkUnica(Highcharts);

const options: Highcharts.Options = {
  chart: {
    zoomType: "x",
    height: 300,
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
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    spline: {
      lineWidth: 4,
      marker: {
        enabled: false,
      },
    },
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y:,.0f}</b>",
  },
  series: [
    {
      name: "positive increase",
      type: "area",
      data: [] as any,
      visible: true,
    },
  ],
};

export const MiniChart = (props: HighchartsReact.Props) => {
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

      // latest result > or < 10 day average
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
          text: `${props.state} <br /> yesterday / 10 day avg <br />${lastIndex} / ${average} <br /> `,
        },
      };

      newOptions.series = [
        {
          name: "positiveIncrease",
          type: "spline",
          data: positiveIncrease,
          visible: true,
          color: color,
          lineWidth: 3,
          crisp: false,
          enableMouseTracking: false,
        },
      ];

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
        >
          <CircularProgress />
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  );
};
