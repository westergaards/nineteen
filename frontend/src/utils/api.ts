import axios, { AxiosRequestConfig } from "axios";

const baseUrl: string = "https://covidtracking.com";
const currentUrl: string = "/api/v1/us/current.json";

export const USCurrentTotals = async () => {
  return await axios.get(`${baseUrl}${currentUrl}`);
};
