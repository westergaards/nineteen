"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const unemploymentStatesByMonth_1 = require("../data/unemploymentStatesByMonth");
const unemploymentStatesByMonthAndSeriesId_1 = require("../data/unemploymentStatesByMonthAndSeriesId");
let mappedData = unemploymentStatesByMonth_1.unemploymentStats.map((state) => {
    let stateId = state.seriesID.substring(3).slice(0, -2);
    return {
        seriesId: state.seriesID,
        stateId: stateId,
        state: unemploymentStatesByMonthAndSeriesId_1.states[stateId],
        data: state.data.map((datum) => {
            return {
                ...datum,
                datetime: new Date(`${datum.periodName} ${datum.year}`),
                time: new Date(`${datum.periodName} ${datum.year}`).getTime(),
            };
        }),
    };
});
fs_1.default.writeFileSync("stats.json", JSON.stringify(mappedData), {
    flag: "a",
});
console.log(JSON.stringify(mappedData[0]));
//# sourceMappingURL=mapUnemploymentStats.js.map