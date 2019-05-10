/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import LineChart from "../../components/LineChart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested, Router } from "../../libraries";
import { mostAndLeast, normalize } from "../../modules/Chart";

const handleData = data => {
  return {
    globalStats: mostAndLeast(data),
    chart: normalize(data, "openIssues"),
  };
};

const NeedsDiagnosis = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("needsdiagnosis-timeline")}
      title={"Needs diagnosis dashboard"}
      subtitle={"Tracking issue diagnosis burndown rate"}
      normalizeData={handleData}
      renderChart={data => (
        <LineChart
          title={"Open issues in needsdiagnosis milestone"}
          label={""}
          labels={ObjectNested.get(data, "chart.dates", [])}
          legend={{ display: false }}
          data={ObjectNested.get(data, "chart.openIssues", [])}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                  time: {
                    minUnit: "hour",
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

export default NeedsDiagnosis;
