import React, { useEffect, useRef, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { createGlobalState } from "react-use";
import { HeaderCards } from "./components/cards/HeaderCards";
import { Timeline } from "./components/Timeline/Timeline";
import { StateChartWrapper } from "./components/charts/StateChartWrapper";
import { CountryChartWrapper } from "./components/charts/CountryChartWrapper";

interface ComprehensiveStats {
  death: number;
  hash: string;
  hospitalized: number;
  hospitalizedCumulative: number;
  hospitalizedCurrently: number;
  inIcuCumulative: number;
  inIcuCurrently: number;
  lastModified: string;
  negative: number;
  notes: string;
  onVentilatorCumulative: number;
  onVentilatorCurrently: number;
  pending: number;
  posNeg: number;
  positive: number;
  recovered: number;
  total: number;
  totalTestResults: number;
}

interface CountryStats {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

export const useCountryStats = createGlobalState<CountryStats[]>();

function debounce(fn: Function, ms: number) {
  let timer: any;
  return (_: any) => {
    clearTimeout(timer);
    timer = setTimeout((_: any) => {
      timer = null;
      fn.apply(this, ...arguments);
    }, ms);
  };
}

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight - 250,
    width: window.innerWidth,
  });
  const chartContainer = useRef(null);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight - 250,
        width: window.innerWidth,
      });
    }, 1000);

    console.log("dimensions", dimensions.height);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <div className="App">
      <Box>
        <Box pb={2}>
          <HeaderCards />
        </Box>
        <Box display="flex">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box width="20vw" height={dimensions.height} overflow="auto">
                <Timeline align="left" />
              </Box>
            </Grid>
            <Grid item xs={9} id="chart-container" ref={chartContainer}>
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <CountryChartWrapper />
                <StateChartWrapper />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default App;
