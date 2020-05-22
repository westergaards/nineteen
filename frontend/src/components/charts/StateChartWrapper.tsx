import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { createGlobalState, useMount } from "react-use";
import axios from "axios";
import { StateChart } from "./StateChart";
import { StateTestChart } from "./StateTestChart";

export interface State {
  dataQualityGrade: string;
  date: string;
  dateChecked: string;
  datetime: number;
  death: number;
  deathIncrease: number;
  fips: string;
  hash: string;
  hospitalized: null;
  hospitalizedCumulative: null;
  hospitalizedCurrently: number;
  hospitalizedIncrease: number;
  inIcuCumulative: null;
  inIcuCurrently: number;
  lastUpdateEt: string;
  negative: number;
  negativeIncrease: number;
  onVentilatorCumulative: null;
  onVentilatorCurrently: null;
  pending: null;
  posNeg: number;
  positive: number;
  positiveIncrease: number;
  recovered: null;
  state: string;
  total: number;
  totalTestResults: number;
  totalTestResultsIncrease: number;
}

export const useStateStats = createGlobalState<State[]>();

export const StateChartWrapper = () => {
  const [, setStateStats] = useStateStats();

  useMount(async () => {
    try {
      let california = await axios.get(
        "https://v5cf31h8sd.execute-api.us-east-1.amazonaws.com/dev/state/search?state=CA"
      );
      let kansas = await axios.get(
        "https://v5cf31h8sd.execute-api.us-east-1.amazonaws.com/dev/state/search?state=KS"
      );
      let results = [...california.data.message, ...kansas.data.message];

      setStateStats(results);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Box display="flex" pr={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <StateChart state="CA" />
          </Paper>
          <Paper elevation={3}>
            <StateTestChart state="CA" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <StateChart state="KS" />
          </Paper>
          <Paper elevation={3}>
            <StateTestChart state="KS" />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <StateChart state="OR" />
          </Paper>
          <Paper elevation={3}>
            <StateTestChart state="OR" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <StateChart state="KS" />
          </Paper>
          <Paper elevation={3}>
            <StateTestChart state="KS" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <StateChart state="FL" />
          </Paper>
          <Paper elevation={3}>
            <StateTestChart state="FL" />
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
};
