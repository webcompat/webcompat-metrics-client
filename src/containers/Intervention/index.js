/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import dayjs from "dayjs";

import LineChart from "../../components/LineChart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested } from "../../libraries";
import { interventionParse } from "../../modules/Intervention";
import Router from "../../routes";

import Filters from "./Filters";

const Intervention = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("firefox-interventions")}
      title={"Firefox WebCompat interventions"}
      subtitle={
        "Tracking available and deployed WebCompat interventions in Firefox products"
      }
      normalizeData={(data) => {
        return interventionParse(data);
      }}
      shouldRenderCommonFilters={false}
      renderFilters={(handleChange, filters) => (
        <Filters onChange={handleChange} filters={filters} />
      )}
      injectedFilters={{
        end: dayjs().format("YYYY-MM-DD"),
        start: dayjs().startOf("year").format("YYYY-MM-DD"),
        distribution: "upstream",
        type: "all",
      }}
      renderChart={(data) => (
        <LineChart
          title={"Firefox Interventions"}
          label={""}
          labels={ObjectNested.get(data, "dates", [])}
          legend={{ display: true, position: "bottom" }}
          data={ObjectNested.get(data, "counters", [])}
          multiple={true}
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

export default Intervention;
