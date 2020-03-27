/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import dayjs from "dayjs";

import BarChart from "../../components/BarChart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested } from "../../libraries";
import { mostAndLeast, normalize } from "../../modules/Chart";
import Router from "../../routes";

const handleData = (data) => {
  const localData = ObjectNested.get(data, "timeline", {});
  return {
    globalStats: mostAndLeast(localData),
    chart: normalize(localData, "newIssues"),
  };
};

const WeeklyReports = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("weekly-counts")}
      title={"Weekly Issues Reported Dashboard"}
      subtitle={"Tracking weekly volume of new issues"}
      normalizeData={handleData}
      injectedFilters={{
        from: dayjs().subtract(2, "month").startOf("week").format("YYYY-MM-DD"),
        to: dayjs().startOf("week").format("YYYY-MM-DD"),
      }}
      renderChart={(data) => (
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
