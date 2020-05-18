import axios from "axios";

const date = "20200408";
const state = "CA";

// US Current and Historical Data
const USCurrentData = `api/v1/us/current.json`;
const USDailyData = `api/v1/us/daily.json`;
const USDailyByDateData = `api/v1/us/${date}.json`;

// States Current and Historical Data
const statesCurrentData = `api/v1/us/current.json`;
const statesCurrentByStateData = `api/v1/states/${state}/current.json`;
const statesDailyData = `api/v1/states/daily.json`;
const statesDailyByStateData = `api/v1/states/${state}/daily.json`;
const statesByStateAndDate = `api/v1/states/${state}/${date}.json`;

// Additional Endpoints
/* not used 
const stateIfno = `api/v1/states/info.json`;
const counties = `api/v1/counties/json`;
const cdcDaily = `api/v1/cdc/daily.json`;
const urls = `api/v1/urls.json`;
*/

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
