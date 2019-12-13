/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import MetricsTemplate from "../MetricsTemplate";
import { Router } from "../../libraries";
import FramedChart from "../../components/FramedChart";

const handleData = data => {
  return {
    spreadsheetId: data.currentDoc,
  };
};

const TSCI = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("tsci-doc")}
      title={"TSCI"}
      subtitle={
        "Measuring user pain from webcompat issues (aggregated, mobile & desktop)"
      }
      normalizeData={handleData}
      shouldRenderCommonFilters={false}
      shouldRenderHeader={false}
      shouldRenderSimpleStat={false}
      renderChart={data => {
        return (
          <FramedChart
            spreadsheetId={data.spreadsheetId}
            spreadsheetBaseUrl={"https://docs.google.com/spreadsheets/d/"}
            spreadsheetEnd={
              "/pubhtml?widget=true&headers=false&embedded=true&chrome=false"
            }
          />
        );
      }}
    />
  );
};

export default TSCI;
