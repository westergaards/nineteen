import React from "react";
import {
  Grid,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { createGlobalState } from "react-use";
import { HeaderCards } from "./components/cards/HeaderCards";

// import { CountryChartWrapper } from "./components/charts/CountryChartWrapper";
import { MiniChartWrapper } from "./components/charts/MiniChart/MiniChartWrapper";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  },
  charts: {
    paddingTop: theme.spacing(2),
  },
}));

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      // type: "dark",
      background: {
        default: "#000",
      },
    },
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container xs={12} justify="center" className={classes.root}>
        <Grid item>
          <HeaderCards />
        </Grid>
        <Grid item className={classes.charts}>
          <MiniChartWrapper />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
