import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Box } from "@material-ui/core";
import { byCountryTotalAllStatus } from "../../utils/covidApi";
import { useCountryStats } from "../../App";
import darkUnica from "highcharts/themes/dark-unica";
import AnnotationsModule from "highcharts/modules/annotations";
AnnotationsModule(Highcharts);
darkUnica(Highcharts);

// const highChartOptions = Highcharts.getOptions();
// const color =
//   highChartOptions && Array.isArray(highChartOptions.colors)
//     ? highChartOptions.colors[0]
//     : "rgb(255, 255, 255)";

// const optionsBack = {
//   title: {
//     text: "US Deaths by Day",
//   },
//   chart: {
//     zoomType: "x",
//   },
//   xAxis: {
//     type: "datetime",
//   },
//   yAxis: {
//     title: {
//       text: "Deaths",
//     },
//     min: 0,
//   },
//   legend: {
//     enabled: false,
//   },

//   annotations: [
//     {
//       labels: [] as any,
//     },
//   ],
//   plotOptions: {
//     area: {
//       fillColor: {
//         linearGradient: {
//           x1: 0,
//           y1: 0,
//           x2: 0,
//           y2: 1,
//         },
//         stops: [
//           [0, color],
//           [1, Highcharts.color(color).setOpacity(0).get("rgba")],
//         ],
//       },
//       marker: {
//         radius: 2,
//       },
//       lineWidth: 1,
//       states: {
//         hover: {
//           lineWidth: 1,
//         },
//       },
//       threshold: null,
//     },
//     series: {},
//   },
//   series: [
//     {
//       name: "deaths",
//       type: "area",
//       data: [] as number[][],
//     },
//   ],
// };

const options = {
  chart: {
    type: "column",
    zoomType: "x",
    height: 300,
    backgroundColor: "#000",
  },
  title: {
    text: "US Deaths by Day",
    style: {
      fontSize: "20px",
    },
  },
  xAxis: {
    type: "datetime",
  },
  yAxis: {
    gridLineWidth: 0,
    visible: true,
    min: 0,
    title: "total",
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      pointWidth: 5,
      borderColor: "#E63946",
    },
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
      color: "#E63946",
    },
  ],
};

export const CountryChart = () => {
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
      // let series = value.map((f) => {
      //   return [new Date(f.Date).getTime(), f.Deaths];
      // });

      let series = value
        .filter((a) => a.Date > "2020-03-09T00:00:00Z")
        .filter((a) => a.Deaths !== 0)
        .map((a, b, arr) => {
          // let previousValue = b !== 0 ? (arr[b - 1] as CountryStats) : 0;
          // let delta: any =
          //   previousValue === 0 ? 0 : (previousValue.Deaths as CountryStats);
          let previousDeathValue = 0;
          let delta = 0;

          if (typeof arr[b - 1] === "object") {
            previousDeathValue = arr[b - 1].Deaths;
            let currentDeathValue = arr[b].Deaths;
            if (currentDeathValue === 0) {
              console.log("here");
            }
            delta =
              currentDeathValue > previousDeathValue
                ? currentDeathValue - previousDeathValue
                : previousDeathValue;
          }

          return [
            new Date(a.Date).getTime(),
            //death: a.Deaths,
            delta,
          ];
        });

      newOptions.series = [
        {
          name: "deaths",
          data: series,
          color: "#E63946",
        },
      ];

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
      </Box>
    </div>
  );
};
