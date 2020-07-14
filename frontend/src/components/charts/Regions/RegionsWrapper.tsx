import React, { useEffect, useState } from "react";
import { Box, Grid, Fade } from "@material-ui/core";

import { useRegionStats } from "../../../App";
import { Region } from "./Region";

const aggregateTotals = (arrToReduce) => {
  return Object.values(
    arrToReduce.reduce((prev, curr, index, arr) => {
      if (prev[arr[index][0]] && prev[arr[index][0]][0] === curr[0]) {
        prev[arr[index][0]][1] = prev[arr[index][0]][1] + curr[1];
      } else {
        prev[arr[index][0]] = [arr[index][0], arr[index][1]];
      }
      return prev;
    }, [])
  );
};

const mappedRegions = (states) => {
  let updated = [];
  Object.keys(states).forEach((key) => {
    updated = [...updated, ...states[key]];
  });

  updated = updated.sort((a, b) => a.datetime - b.datetime);

  //#region Positive Increase
  let positiveIncrease = updated.map((item) => [
    item.datetime,
    item.positiveIncrease || 0,
  ]);

  let positiveIncreaseAggregated = aggregateTotals(positiveIncrease);

  let averageSlice = positiveIncreaseAggregated.slice(
    positiveIncreaseAggregated.length - 11,
    positiveIncreaseAggregated.length - 1
  );

  const arrAvg = (arr) =>
    arr.reduce((a: any, b: any) => a + b[1], 0) / arr.length;

  let average = arrAvg(averageSlice);
  let lastIndex =
    positiveIncreaseAggregated[positiveIncreaseAggregated.length - 1][1];
  let color = lastIndex > average ? "#E63946" : "#06d6a0";
  //#endregion

  let hospitalized = updated.map((item) => [
    item.datetime,
    item.hospitalizedIncrease || 0,
  ]);

  let hospitalizedAggregated = aggregateTotals(hospitalized);

  let death = updated.map((item) => [item.datetime, item.deathIncrease || 0]);

  let deathAggregated = aggregateTotals(death);

  return {
    average,
    color,
    lastIndex,
    positiveIncreaseAggregated,
    hospitalizedAggregated,
    deathAggregated,
  };
};

export const RegionsWrapper = () => {
  const [regions] = useRegionStats();
  const [mappedRegion, setMappedRegions] = useState(null);

  useEffect(() => {
    if (regions) {
      let hash = {};
      Object.keys(regions).forEach(
        (region) => (hash[region] = mappedRegions(regions[region]))
      );

      setMappedRegions(hash);
    }
  }, [regions]);

  return (
    <Box>
      <Fade in={true} timeout={1000}>
        <Grid container spacing={3}>
          {mappedRegion &&
            Object.keys(mappedRegion).map((region) => (
              <Grid item xs={12} sm={12} md={12} lg={6} key={region}>
                <Region
                  key={region}
                  name={region}
                  lastIndex={mappedRegion[region].lastIndex}
                  positiveIncrease={
                    mappedRegion[region].positiveIncreaseAggregated
                  }
                  color={mappedRegion[region].color}
                  average={mappedRegion[region].average}
                  hospitialized={mappedRegion[region].hospitalizedAggregated}
                  death={mappedRegion[region].deathAggregated}
                />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </Box>
  );
};
