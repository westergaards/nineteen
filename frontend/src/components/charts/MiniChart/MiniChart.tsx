import React, { useState } from "react";
import { Box } from "@material-ui/core";
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

  useMount(async () => {
    try {
      let result = await axios.get(
        `https://v5cf31h8sd.execute-api.us-east-1.amazonaws.com/dev/state/search?state=${props.state}`
      );
      let states = result.data.message;
      const newOptions = {
        ...chartOptions,
        title: { ...chartOptions.title, text: props.state },
      };

      let filtered = states
        .filter((s) => s.state === props.state)
        .sort((a, b) => a.datetime - b.datetime);

      let positiveIncrease = filtered.map((f) => {
        return [f.datetime, f.positiveIncrease || 0];
      });

      newOptions.series = [
        {
          name: "positiveIncrease",
          type: "spline",
          data: positiveIncrease,
          visible: true,
          color: "#2a9d8f",
          lineWidth: 3,
          crisp: false,
          enableMouseTracking: false,
        },
      ];
      console.log("states", newOptions);

      setChartOptions(newOptions);
    } catch (e) {
      console.log("there was an error", e);
    }
  });
  return (
    <Box>
      {!chartOptions ? (
        <Box>foo</Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  );
};
