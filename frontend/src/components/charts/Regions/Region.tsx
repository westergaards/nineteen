/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import darkUnica from "highcharts/themes/dark-unica";
import "./Region.css";
darkUnica(Highcharts);

const options = {
  chart: {
    type: "column",
    zoomType: "x",
    height: 450,
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

export const Region = ({
  name,
  lastIndex,
  positiveIncrease,
  color,
  average,
}) => {
  const [chartOptions, setChartOptions] = useState(options);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    console.log("increase", positiveIncrease);
    if (positiveIncrease) {
      const newOptions = {
        ...chartOptions,
        title: {
          ...chartOptions.title,
          useHTML: true,
          text: `<div style="display: flex; flex-direction: column;">
              <div style="display: flex; font-size: 22px; justify-content: center;">
                <b>${name}</b>
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
          name: name,
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
    }
  }, [positiveIncrease]);

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
