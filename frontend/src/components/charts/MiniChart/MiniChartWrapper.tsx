import React from "react";
import { Box, Paper, Grid, Fade } from "@material-ui/core";
import { createGlobalState } from "react-use";
import { MiniChart } from "./MiniChart";
import { stateAbbreviations } from "./states";

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

export const useMiniChartStateStats = createGlobalState<State[]>();

export const MiniChartWrapper = () => {
  return (
    <Box display="flex">
      <Fade in={true} timeout={1000}>
        <Grid container spacing={3}>
          {stateAbbreviations.map((state) => (
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} style={{ backgroundColor: "#000" }}>
                <MiniChart state={state} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Box>
  );
};
