import React from "react";
import { Box, Grid } from "@material-ui/core";
import { createGlobalState } from "react-use";
import { HeaderCards } from "./components/cards/HeaderCards";
import { Timeline } from "./components/Timeline/Timeline";
import { StateChartWrapper } from "./components/charts/StateChartWrapper";
import { CountryChartWrapper } from "./components/charts/CountryChartWrapper";

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
export const useChartPlotPoints = createGlobalState<number>();

function App() {
  return (
    <Box p={1}>
      <Box pb={2}>
        <HeaderCards />
      </Box>
      <Box display="flex">
        <Grid container spacing={3}>
          {/* <Grid item xs={3}>
            <Box display="flex">
              <Timeline align="left" />
            </Box>
          </Grid> */}
          <Grid item xs={12} id="chart-container">
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <CountryChartWrapper />
              <StateChartWrapper />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
