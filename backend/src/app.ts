// This code is to pull historical state data
// from the covid api
// ex: curl -X GET "https://covidtracking.com/api/v1/states/CA/20200408.json"

import axios from "axios";
import fs from "fs";

const historicalStatesTotalsUrl =
  "https://covidtracking.com/api/v1/states/daily.json";
const currentStatesTotalsUrl =
  "https://covidtracking.com/api/v1/states/current.json";
const historicalUSDataTotalsUrl =
  "https://covidtracking.com/api/v1/us/daily.json";
const currentUSDataTotalsUrl =
  "https://covidtracking.com/api/v1/us/current.json";

const fetchData = async (url: string) => {
  console.log(url);
  try {
    return await axios.get<any>(url);
  } catch (e) {
    console.log("there was an error fetching ", e, url);
  }
};

const getHistoricalStateData = async () => {
  try {
    let result = await fetchData(historicalStatesTotalsUrl);
    fs.writeFileSync(
      "./export/historical-state-data.json",
      JSON.stringify(result?.data)
    );
  } catch (e) {
    console.log("unable to fetch daily stats totals", e);
  }
};

const getCurrentStateData = async () => {
  try {
    let result = await fetchData(currentStatesTotalsUrl);
    fs.writeFileSync(
      "./export/current-state-data.json",
      JSON.stringify(result?.data)
    );
  } catch (e) {
    console.log("unable to fetch current stats totals", e);
  }
};

const getCurrentUSData = async () => {
  try {
    let result = await fetchData(currentUSDataTotalsUrl);
    fs.writeFileSync(
      "./export/current-us-data.json",
      JSON.stringify(result?.data)
    );
  } catch (e) {
    console.log("unable to fetch current stats totals", e);
  }
};

const getHistoricalUSData = async () => {
  try {
    let result = await fetchData(historicalUSDataTotalsUrl);
    fs.writeFileSync(
      "./export/historical-us-data.json",
      JSON.stringify(result?.data)
    );
  } catch (e) {
    console.log("unable to fetch current stats totals", e);
  }
};

// getCurrentStateData();
// getHistoricalStateData();

getCurrentUSData();
getHistoricalUSData();
