import React from "react";
import {
  Box,
  Paper,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import CountUp from "react-countup";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2a2a2b",
      color: "#e0e0e3",
    },
  },
}));

export const Card = (props: any) => {
  const classes = useStyles();
  const format = (number) => numeral(number).format("0,0");
  return (
    <Box className={classes.root}>
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column">
          {!props.value ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Box textAlign="center">
                <Typography variant="h4">
                  {props.value === 0 || !props.value ? (
                    `0`
                  ) : (
                    <CountUp end={props.value} formattingFn={format} />
                  )}
                </Typography>
              </Box>
              <Box pt={4}>
                <Typography variant="h5">{props.title}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
