import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { createGlobalState } from "react-use";
import axios from "axios";
import { useMount } from "react-use";
import { HeaderCards } from "./components/cards/HeaderCards";

import { CountryChartWrapper } from "./components/charts/CountryChartWrapper";
// import { MiniChartWrapper } from "./components/charts/MiniChart/MiniChartWrapper";
import { StatesChartWrapper } from "./components/charts/UnitedStates/StatesChartWrapper";
import { HospitalChartWrapper } from "./components/charts/Hospital/HospitalChartWrapper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ButtonBar } from "./components/cards";
import { RegionsWrapper } from "./components/charts/Regions";
import { REGIONS } from "./utils/enums/Regions";

export interface CountryStats {
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

export enum ViewName {
  REGIONS = "REGIONS",
  STATES = "STATES",
  HOSPITAL = "HOSPITAL",
}

export const useCountryStats = createGlobalState<CountryStats[]>();
export const useChartPlotPoints = createGlobalState<number>();
export const useStateStats = createGlobalState<any>(null);
export const useRegionStats = createGlobalState<any>(null);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      // backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      // backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.up("lg")]: {
      //  backgroundColor: "#ececec",
    },
    alignSelf: "center",
  },
  charts: {
    paddingTop: theme.spacing(2),
  },
  header: {
    display: "flex",
  },
}));

function App() {
  const [states, setStatesStats] = useStateStats();
  const [, setRegionStats] = useRegionStats();
  const [loading] = useState(false);
  const [view, setView] = useState(ViewName.REGIONS);
  const darkTheme = createMuiTheme({
    palette: {
      // type: "dark",
      background: {
        default: "#000",
      },
    },
  });
  const classes = useStyles();

  useMount(async () => {
    if (!states) {
      let result = await axios.get(
        `https://t5ozqw55je.execute-api.us-east-1.amazonaws.com/dev/states`
      );

      setStatesStats(result.data.message);

      let results = result.data.message;
      let mappedRegions = {};

      Object.keys(results).forEach((result) => {
        let regionForState = REGIONS[result];

        //if (!["AS", "GU", "MH", "MP", "PW", "PR", "VI"].includes(result)) {
        if (
          ["WA", "OR", "CA", "NV", "AZ", "NY", "NJ", "FL", "KS", "OK"].includes(
            result
          )
        ) {
          mappedRegions[regionForState] = {
            ...mappedRegions[regionForState],
            [result]: results[result],
          };
        }
      });

      setRegionStats(mappedRegions);
    }
  });

  const handleClick = (viewValue) => {
    if (viewValue !== view) {
      setView(viewValue);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container justify="center" direction="column">
        <Grid container className={classes.root}>
          <HeaderCards />
        </Grid>

        <Grid container justify="center">
          <ButtonBar onClick={handleClick} />
        </Grid>

        <Grid item>
          <CountryChartWrapper />
          {loading ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            <div>
              {view === ViewName.REGIONS && <RegionsWrapper />}
              {view === ViewName.STATES && <StatesChartWrapper />}
              {view === ViewName.HOSPITAL && <HospitalChartWrapper />}
            </div>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
