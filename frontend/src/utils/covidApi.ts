import axios from "axios";

const baseUrl: string = "https://api.covid19api.com";

// {{baseUrl}}/total/country/{{country}}/status/{{status}}?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
export const byCountryTotal = async () => {
  return await axios.get(
    `${baseUrl}/total/country/united-states/status/confirmed?from=2020-01-01T00:00:00Z&to=${new Date().toISOString()}`
  );
};

export const byCountryTotalAllStatus = async () => {
  return await axios.get(`${baseUrl}/total/country/united-states`);
};

export const countrySummary = async () => {
  return await axios.get(`${baseUrl}/summary`);
};

export const getAllStatesByTime = async () => {
  return await axios.get(
    `${baseUrl}/live/country/united-states/status/confirmed/date/2020-03-21T13:13:30Z`
  );
};
