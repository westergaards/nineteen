import axios from "axios";
// Get summary totals for the US (today and yesterdau)
// for some reason the api library does not filter out
// by state and options so we'll use the actual api here

const baseUrl = "https://disease.sh/v2";
export const getCountrySummaryStatsToday = async () => {
  let result = await axios.get(`${baseUrl}/countries/USA?yesterday=false`);
  return result.data;
};

export const getCountrySummaryStatsYesterday = async () => {
  let result = await axios.get(`${baseUrl}/countries/USA?yesterday=true`);
  return result.data;
};
