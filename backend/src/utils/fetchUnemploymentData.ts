// This file will scrape the unemployment rate
// And then it will put in the in the frontend folder for consumption.
import axios from "axios";
import { states } from "../data/unemploymentStatesByMonthAndSeriesId";
import fs from "fs";

const baseUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data`;
const key1 = "4c232ef3fb0643618a1181fd1e131a2b"; // steve.westergaard
const key = "756b285881eb468abe533841422717d0"; // sfgianthater

interface BLIResponse {
  Results: {
    series: {
      seriesID: string;
      data: {
        year: string;
        period: string;
        periodName: string;
        latest: string;
        value: string;
        footNotes: { code: string; text: string }[];
      }[];
    };
  };
}

const callApi = async (url: string) => {
  try {
    return await axios.get<BLIResponse>(url);
  } catch (e) {
    console.log("there was an error fetching ", e, url);
  }
};

let consolidated = [] as any;
const fetchData = async (url: string) => {
  console.log(`${new Date().toISOString()}-${url}`);
  try {
    const result = await callApi(url);
    console.log(result?.data.Results.series[0]);
    consolidated.push(result?.data.Results.series[0]);
  } catch (e) {
    console.log("there was an error fetching data", e);
  }
};

interface State {
  [state: string]: string;
}

const fetchUnemploymentData = async () => {
  const keys = Object.keys(states);
  for (let i = 0; i < keys.length; i++) {
    await fetchData(`${baseUrl}/LAU${keys[i]}03?registrationkey=${key}`);
  }

  fs.writeFileSync("unemployment-stats.json", JSON.stringify(consolidated), {
    flag: "a",
  });
};

fetchUnemploymentData();
