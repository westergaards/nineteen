import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { CountryChart } from "./CountryChart";

export const CountryChartWrapper = () => {
  return (
    <Box display="flex" pb={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <CountryChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
