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
      text: "Deaths and Hospitalization",
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

export const StateChart = (props: { state: string }) => {
  const [states] = useStateStats();
  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    if (states) {
      const newOptions = { ...chartOptions, title: { text: props.state } };

      let filtered = states
        .filter((s) => s.state === props.state)
        .sort((a, b) => a.datetime - b.datetime);
      let deathData = filtered.map((f) => {
        return [f.datetime, f.death];
      });

      let increaseInDeathData = filtered.map((f) => {
        return [f.datetime, f.deathIncrease];
      });

      let hospitializedData = filtered.map((f) => {
        return [f.datetime, f.hospitalizedCurrently || 0];
      });

      let onVentilatorsData = filtered.map((f) => {
        return [f.datetime, f.onVentilatorCurrently || 0];
      });

      let inIcuCurrentlyData = filtered.map((f) => {
        return [f.datetime, f.inIcuCurrently || 0];
      });

      newOptions.series = [
        {
          name: "Deaths",
          type: "area",
          data: deathData,
        },
        {
          name: "Increase in Death",
          type: "area",
          data: increaseInDeathData,
        },
        {
          name: "Hospitialized",
          type: "area",
          data: hospitializedData,
        },
        {
          name: "On Ventilator",
          type: "area",
          data: onVentilatorsData,
        },
        {
          name: "In ICU",
          type: "area",
          data: inIcuCurrentlyData,
        },
      ];

      if (props.state === "KS") {
        console.log(filtered);
      }

      // let unemploymentStateData = data.find(
      //   (unemployment) => unemployment.state === props.state
      // );

      // if (unemploymentStateData) {
      //   Object.entries(stateData).map(([k, v]) => {
      //     let time = k[0];
      //     let blah = unemploymentStateData.data.find(
      //       (datum) => datum.datetime === time
      //     );
      //   });
      //}

      setChartOptions(newOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
