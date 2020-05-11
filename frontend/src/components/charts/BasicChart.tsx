import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Box } from "@material-ui/core";
import { byCountryTotalAllStatus } from "../../utils/covidApi";
import { useCountryStats } from "../../App";
import { timeline } from "../models/timeline";

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
  },
  series: [
    {
      name: "deaths",
      type: "area",
      data: [] as number[][],
    },
  ],
};

export const BasicChart = () => {
  const [value, setValue] = useCountryStats();
  const [chartOptions, setChartOptions] = useState<any>(null);

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

      for (const point of series) {
        let [datetime, deaths] = point;
        if (timeline[datetime]) {
          let label = {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: datetime,
              y: deaths,
            },
            text: timeline[datetime],
          };
          newOptions.annotations[0].labels.push(label);
        }
      }

      newOptions.series = [
        {
          name: "deaths",
          type: "area",
          data: series,
        },
      ];

      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      {!chartOptions ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={400}
        >
          <CircularProgress />
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </div>
  );
};
