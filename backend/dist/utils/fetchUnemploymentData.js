"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file will scrape the unemployment rate
// And then it will put in the in the frontend folder for consumption.
const axios_1 = __importDefault(require("axios"));
const unemploymentStatesByMonthAndSeriesId_1 = require("../data/unemploymentStatesByMonthAndSeriesId");
const fs_1 = __importDefault(require("fs"));
const baseUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data`;
const key1 = "4c232ef3fb0643618a1181fd1e131a2b"; // steve.westergaard
const key = "756b285881eb468abe533841422717d0"; // sfgianthater
const callApi = async (url) => {
    try {
        return await axios_1.default.get(url);
    }
    catch (e) {
        console.log("there was an error fetching ", e, url);
    }
};
let consolidated = [];
const fetchData = async (url) => {
    console.log(`${new Date().toISOString()}-${url}`);
    try {
        const result = await callApi(url);
        console.log(result === null || result === void 0 ? void 0 : result.data.Results.series[0]);
        consolidated.push(result === null || result === void 0 ? void 0 : result.data.Results.series[0]);
    }
    catch (e) {
        console.log("there was an error fetching data", e);
    }
};
const fetchUnemploymentData = async () => {
    const keys = Object.keys(unemploymentStatesByMonthAndSeriesId_1.states);
    for (let i = 0; i < keys.length; i++) {
        await fetchData(`${baseUrl}/LAU${keys[i]}03?registrationkey=${key}`);
    }
    fs_1.default.writeFileSync("unemployment-stats.json", JSON.stringify(consolidated), {
        flag: "a",
    });
};
fetchUnemploymentData();
//# sourceMappingURL=fetchUnemploymentData.js.map