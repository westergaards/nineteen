import fs from "fs";
import { unemploymentStats } from "../data/unemploymentStatesByMonth";
import { states } from "../data/unemploymentStatesByMonthAndSeriesId";

let mappedData = unemploymentStats.map((state) => {
  let stateId = state.seriesID.substring(3).slice(0, -2);

  return {
    seriesId: state.seriesID,
    stateId: stateId,
    state: states[stateId],
    data: state.data.map((datum) => {
      return {
        ...datum,
        datetime: new Date(`${datum.periodName} ${datum.year}`),
        time: new Date(`${datum.periodName} ${datum.year}`).getTime(),
      };
    }),
  };
});

fs.writeFileSync("stats.json", JSON.stringify(mappedData), {
  flag: "a",
});

console.log(JSON.stringify(mappedData[0]));
