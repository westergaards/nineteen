"use strict";
// This code is to pull historical state data
// from the covid api
// ex: curl -X GET "https://covidtracking.com/api/v1/states/CA/20200408.json"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const historicalStatesTotalsUrl = "https://covidtracking.com/api/v1/states/daily.json";
const currentStatesTotalsUrl = "https://covidtracking.com/api/v1/states/current.json";
const historicalUSDataTotalsUrl = "https://covidtracking.com/api/v1/us/daily.json";
const currentUSDataTotalsUrl = "https://covidtracking.com/api/v1/us/current.json";
const fetchData = async (url) => {
    console.log(url);
    try {
        return await axios_1.default.get(url);
    }
    catch (e) {
        console.log("there was an error fetching ", e, url);
    }
};
const getHistoricalStateData = async () => {
    try {
        let result = await fetchData(historicalStatesTotalsUrl);
        fs_1.default.writeFileSync("./export/historical-state-data.json", JSON.stringify(result === null || result === void 0 ? void 0 : result.data));
    }
    catch (e) {
        console.log("unable to fetch daily stats totals", e);
    }
};
const getCurrentStateData = async () => {
    try {
        let result = await fetchData(currentStatesTotalsUrl);
        fs_1.default.writeFileSync("./export/current-state-data.json", JSON.stringify(result === null || result === void 0 ? void 0 : result.data));
    }
    catch (e) {
        console.log("unable to fetch current stats totals", e);
    }
};
const getCurrentUSData = async () => {
    try {
        let result = await fetchData(currentUSDataTotalsUrl);
        fs_1.default.writeFileSync("./export/current-us-data.json", JSON.stringify(result === null || result === void 0 ? void 0 : result.data));
    }
    catch (e) {
        console.log("unable to fetch current stats totals", e);
    }
};
const getHistoricalUSData = async () => {
    try {
        let result = await fetchData(historicalUSDataTotalsUrl);
        fs_1.default.writeFileSync("./export/historical-us-data.json", JSON.stringify(result === null || result === void 0 ? void 0 : result.data));
    }
    catch (e) {
        console.log("unable to fetch current stats totals", e);
    }
};
// getCurrentStateData();
// getHistoricalStateData();
getCurrentUSData();
getHistoricalUSData();
//# sourceMappingURL=app.js.map