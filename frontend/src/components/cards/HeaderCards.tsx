import React, { useState } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useMount } from "react-use";
import { format } from "date-fns";
import { Card } from "./Card";
import { getCountrySummaryStatsToday } from "../../utils/novelApi";
import { Country } from "../../utils/interfaces/country.model";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      // backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      // backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("lg")]: {
      // backgroundColor: "#ececec",
    },
    color: "#fff",
    alignSelf: "center",
  },
  charts: {
    paddingTop: theme.spacing(2),
  },
  date: {
    fontSize: 18,
    fontFamily: "Unica One, sans-serif",
    color: "#fff",
  },
  country: {
    marginBottom: 12,
    fontFamily: "Unica One, sans-serif",
    fontSize: 44,
    color: "#fff",
  },
}));

export const HeaderCards = (props: any) => {
  const [value, setValue] = useState<Country>();
  const classes = useStyles();

  useMount(async () => {
    const result = await getCountrySummaryStatsToday();
    setValue(result);
  });

  return (
    <Grid container>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography className={classes.country} component="div">
            {value?.country} <br />
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.date} component="div">
            {value && format(new Date(), "MM/dd/yyyy")}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item xs={12} sm={3} xl={3}>
          <Card title="Total Deaths" value={value?.deaths} />
        </Grid>
        <Grid item xs={12} sm={3} xl={3}>
          <Card title="Total Cases" value={value?.cases} />
        </Grid>
        <Grid item xs={12} sm={3} xl={3}>
          <Card title="Recovered" value={value?.recovered} />
        </Grid>
        <Grid item xs={12} sm={3} xl={3}>
          <Card title="Critical" value={value?.critical} />
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center" className={classes.charts}>
        <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
          <Card title="Today Deaths" value={value?.todayDeaths || 0} />
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
          <Card title="Today Cases" value={value?.todayCases || 0} />
        </Grid>
      </Grid>
    </Grid>
  );
};
