import React, { useEffect, useState } from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { createGlobalState } from "react-use";
import { BasicChart, StateChart } from "./charts";
import { HeaderCards } from "./cards/HeaderCards";
import { getAllStatesByTime } from "./utils/covidApi";

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

export interface State {
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
export const useStateStats = createGlobalState<State[]>();

function App() {
  const [states, setStates] = useStateStats();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllStatesByTime();
      console.log(result);
      setStates(result.data);
    };

    fetchData();
  }, [setStates]);

  return (
    <div className="App">
      <Box>
        <Box pb={2}>
          <HeaderCards />
        </Box>
        <Box pb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <BasicChart />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" pr={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <StateChart state="California" />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <StateChart state="Kansas" />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default App;
