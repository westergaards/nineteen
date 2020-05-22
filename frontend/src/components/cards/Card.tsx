import React from "react";
import { Box, Paper, makeStyles, CircularProgress } from "@material-ui/core";
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
    },
  },
}));

export const Card = (props: any) => {
  const classes = useStyles();
  console.log("props.value", props.value);
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
              <Box pb={5}>{props.title}</Box>
              <Box textAlign="center">
                {props.value === 0 || !props.value ? (
                  `0`
                ) : (
                  <CountUp end={props.value} formattingFn={format} />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
