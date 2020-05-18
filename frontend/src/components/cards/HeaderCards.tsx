import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useMount } from "react-use";
import { format } from "date-fns";
import { Card } from "./Card";
import { getCountrySummaryStatsToday } from "../../utils/novelApi";
import { Country } from "../../utils/interfaces/country.model";

export const HeaderCards = (props: any) => {
  const [value, setValue] = useState<Country>();
  useMount(async () => {
    const result = await getCountrySummaryStatsToday();
    console.log("result", result);
    setValue(result);
  });

  console.log("value", value);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        pb={2}
      >
        <Box>
          <Typography variant="h4">
            {value?.country} <br />
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            {value && format(new Date(), "MM/dd/yyyy")}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Card title="Total Deaths" value={value?.deaths} />
        <Card title="Today Deaths" value={value?.todayDeaths || 0} />
        <Card title="Total Cases" value={value?.cases} />
        <Card title="Today Cases" value={value?.todayCases || 0} />
        <Card title="Recovered" value={value?.recovered} />
        <Card title="Recovered" value={value?.critical} />
      </Box>
    </Box>
  );
};
