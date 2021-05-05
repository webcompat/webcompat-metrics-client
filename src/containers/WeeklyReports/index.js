/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import dayjs from "dayjs";

import BarChart from "../../components/BarChart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested } from "../../libraries";
import { mostAndLeast } from "../../modules/Chart";
import { weeklyReportsParse } from "../../modules/WeeklyReports";
import Router from "../../routes";

const handleData = (data) => {
  const localData = ObjectNested.get(data, "timeline", {});
  return {
    globalStats: mostAndLeast(localData),
    chart: weeklyReportsParse(localData, "newIssues"),
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
          labels={ObjectNested.get(data, "chart.labels", [])}
          legend={{ display: false }}
          data={ObjectNested.get(data, "chart.newIssues", [])}
          options={{
            parsing: {
              xAxisKey: "timestamp",
              yAxisKey: "count",
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 20,
              },
            },
            scales: {
              xAxes: [
                {
                  grid: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
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
