import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { BasicChart } from "./BasicChart";

export const CountryChartWrapper = () => {
  return (
    <Box display="flex" pb={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <BasicChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
