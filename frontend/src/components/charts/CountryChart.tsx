import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Box, Typography } from "@material-ui/core";
import { byCountryTotalAllStatus } from "../../utils/covidApi";
import { useCountryStats, useChartPlotPoints } from "../../App";
import { timeline } from "../models/timeline";
import ReactHtmlParser from "react-html-parser";

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
      // labelOptions: {
      //   backgroundColor: "rgba(255,255,255,0.5)",
      //   verticalAlign: "top",
      //   y: -40,
      // },
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
  const [plotPoints, setPlotPoints] = useChartPlotPoints();
  const [text, setText] = useState("");

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

      // for (const point of series) {
      //   let [datetime, deaths] = point;
      //   if (timeline[datetime]) {
      //     let label = {
      //       point: {
      //         xAxis: 0,
      //         yAxis: 0,
      //         x: datetime,
      //         y: deaths,
      //       },
      //       text: timeline[datetime],
      //     };
      //     newOptions.annotations[0].labels.push(label);
      //   }
      // }

      newOptions.series = [
        {
          name: "deaths",
          type: "area",
          data: series,
        },
      ];

      newOptions.plotOptions.series = {
        point: {
          events: {
            mouseOver: function () {
              var chart = this.series.chart;
              // if (!chart.lbl) {
              //   chart.lbl = chart.renderer
              //     .label("")
              //     .attr({
              //       padding: 10,
              //       r: 10,
              //       fill: Highcharts.getOptions().colors[1],
              //     })
              //     .css({
              //       color: "#FFFFFF",
              //     })
              //     .add();
              // }

              console.log("this.series", this.series);
              if (timeline[this.x]) {
                // var newAnnotations = {
                //   id: "hover",
                //   labels: [
                //     {
                //       point: {
                //         xAxis: 0,
                //         yAxis: 0,
                //         x: this.x,
                //         y: this.y,
                //       },
                //       text: timeline[this.x],
                //     },
                //   ],
                // };

                // console.log(chart);
                // chart.annotations.forEach((annotation) => annotation.destroy());
                // chart.annotations.length = 0;

                // chart.addAnnotation(newAnnotations);
                //chart.update({series: })
                //chart.annotations[0].labels.push(label);
                // chart.lbl.show().attr({
                //   text: timeline[this.x],
                // });
                setText(timeline[this.x]);
              }
            },
          },
        },
        events: {
          mouseOut: function () {
            if (this.chart.lbl) {
              // this.chart.lbl.hide();
              console.log(this.chart);
              //const annotations = this.chart.annotations;

              // this.chart.annotations.forEach((annotation) =>
              //   annotation.destroy()
              // );
              // this.chart.annotations.length = 0;
              // for (let i = annotations.length - 1; i > -1; --i) {
              //   this.chart.removeAnnotation(annotations[i].options.id);
              // }

              // this.chart.annotations = [
              //   {
              //     // labelOptions: {
              //     //   backgroundColor: "rgba(255,255,255,0.5)",
              //     //   verticalAlign: "top",
              //     //   y: -40,
              //     // },
              //     labels: [] as any,
              //   },
              // ];
              // this.chart.removeAnnotation("hover");
              // this.series.chart.annotations = [
              //   {
              //     // labelOptions: {
              //     //   backgroundColor: "rgba(255,255,255,0.5)",
              //     //   verticalAlign: "top",
              //     //   y: -40,
              //     // },
              //     labels: [] as any,
              //   },
              // ];
            }
          },
        },
      };

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
        {/* <Box p={2}>
          <Typography variant="body1" color="textPrimary">
            {ReactHtmlParser(text)}
          </Typography>
        </Box> */}
      </Box>
    </div>
  );
};
