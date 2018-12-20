/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import BarChart from "../../components/BarChart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested } from "../../libraries";
import { mostAndLeast, normalize } from "../../modules/Chart";

const handleData = data => {
  return {
    globalStats: mostAndLeast(data),
    chart: normalize(data, "newIssues"),
  };
};

const WeeklyReports = () => {
  return (
    <MetricsTemplate
      endpoint={"weekly-counts"}
      title={"Needs diagnosis dashboard"}
      subtitle={"Tracking issue diagnosis burndown rate"}
      normalizeData={handleData}
      renderChart={data => (
        <BarChart
          title={"Issues Reported per Week"}
          fill={true}
          label={""}
          labels={ObjectNested.get(data, "chart.dates", [])}
          legend={{ display: false }}
          data={ObjectNested.get(data, "chart.newIssues", [])}
          options={{
            tooltips: {
              enabled: false,
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "series",
                  time: {
                    unit: "week",
                    isoWeekday: true,
                  },
                  stacked: true,
                },
              ],
            },
          }}
        />
      )}
    />
  );
};

export default WeeklyReports;
