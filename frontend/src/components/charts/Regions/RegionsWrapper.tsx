import React, { useEffect, useState } from "react";
import { Box, Grid, Fade } from "@material-ui/core";

import { useRegionStats } from "../../../App";
import { Region } from "./Region";

const mappedRegions = (states) => {
  let updated = [];
  Object.keys(states).forEach((key) => {
    updated = [...updated, ...states[key]];
  });

  updated = updated.sort((a, b) => a.datetime - b.datetime);

  let positiveIncrease = updated.map((item) => [
    item.datetime,
    item.positiveIncrease || 0,
  ]);

  positiveIncrease = Object.values(
    positiveIncrease.reduce((prev, curr, index, arr) => {
      if (prev[arr[index][0]] && prev[arr[index][0]][0] === curr[0]) {
        prev[arr[index][0]][1] = prev[arr[index][0]][1] + curr[1];
      } else {
        prev[arr[index][0]] = [arr[index][0], arr[index][1]];
      }
      return prev;
    }, [])
  );

  console.log("po", positiveIncrease);
  let averageSlice = positiveIncrease.slice(
    positiveIncrease.length - 11,
    positiveIncrease.length - 1
  );

  console.log("as", averageSlice);
  const arrAvg = (arr) =>
    arr.reduce((a: any, b: any) => a + b[1], 0) / arr.length;

  let average = arrAvg(averageSlice);
  let lastIndex = positiveIncrease[positiveIncrease.length - 1][1];
  let color = lastIndex > average ? "#E63946" : "#06d6a0";

  return { average, color, lastIndex, positiveIncrease };
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
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Region
                  key={region}
                  name={region}
                  lastIndex={mappedRegion[region].lastIndex}
                  positiveIncrease={mappedRegion[region].positiveIncrease}
                  color={mappedRegion[region].color}
                  average={mappedRegion[region].average}
                />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </Box>
  );
};
