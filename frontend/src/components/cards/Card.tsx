import React from "react";
import {
  Card as MuiCard,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CountUp from "react-countup";
import numeral from "numeral";

const useStyles = makeStyles(() => ({
  root: {
    width: 165,
    textAlign: "center",
    backgroundColor: "transparent",
    // color: "white",
    fontFamily: "Unica One, sans-serif",
  },
  title: {
    fontSize: 18,
    fontFamily: "Unica One, sans-serif",
  },
  count: {
    marginBottom: 12,
    fontFamily: "Unica One, sans-serif",
    fontSize: 26,
  },
}));

export const Card = (props: any) => {
  const classes = useStyles();
  const format = (number) => numeral(number).format("0,0");
  return (
    <MuiCard elevation={3} className={classes.root}>
      <CardContent>
        <Typography className={classes.count}>
          {props.value === 0 || !props.value ? (
            `0`
          ) : (
            <CountUp end={props.value} formattingFn={format} />
          )}
        </Typography>

        <Typography className={classes.title}>{props.title}</Typography>
      </CardContent>
    </MuiCard>
  );
};
