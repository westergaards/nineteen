import React from "react";
import { Box, Paper, makeStyles } from "@material-ui/core";

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

  return (
    <Box className={classes.root}>
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column">
          <Box pb={5}>{props.title}</Box>
          <Box textAlign="center">{props.value}</Box>
        </Box>
      </Paper>
    </Box>
  );
};
