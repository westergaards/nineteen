import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useMount } from "react-use";
import { format } from "date-fns";
import { Card } from "./Card";
import { countrySummary } from "../utils/covidApi";

interface Summary {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}

export const HeaderCards = (props: any) => {
  const [value, setValue] = useState<Summary>();
  useMount(async () => {
    const result = await countrySummary();

    setValue(
      result.data.Countries.find((d: Summary) => d.Slug === "united-states")
    );
  });

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
            {value?.Country} <br />
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            {value && format(new Date(value?.Date), "MM/dd/yyyy")}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Card title="Deaths" value={value?.TotalDeaths} />
        <Card title="Confirmed" value={value?.TotalConfirmed} />
        <Card title="Recovered" value={value?.TotalRecovered} />
      </Box>
    </Box>
  );
};
