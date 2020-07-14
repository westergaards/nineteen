import React from "react";
import { Box, Paper, Grid, Fade } from "@material-ui/core";
import { StateBarChart } from "./StateBarChart";
import { stateAbbreviations } from "./states";

export const StatesChartWrapper = () => {
  return (
    <Box display="flex">
      <Fade in={true} timeout={1000}>
        <Grid container spacing={3}>
          {stateAbbreviations
            .filter((abv) =>
              [
                "WA",
                "OR",
                "CA",
                "NV",
                "AZ",
                "NY",
                "NJ",
                "FL",
                "KS",
                "OK",
                "AR",
              ].includes(abv)
            )
            .map((state) => (
              <Grid item xs={12} sm={6} md={4} lg={6} key={state}>
                <Paper
                  elevation={3}
                  style={{ backgroundColor: "#000", paddingTop: "8px" }}
                >
                  <StateBarChart state={state} />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Fade>
    </Box>
  );
};
