/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import MetricsTemplate from "../MetricsTemplate";
import { Router } from "../../libraries";

// const spreadsheetID = "1238RmSUsSC8SfNS5bn-ogUvvE0bxQ82IULILm5GRu_Q";
const spreadsheetID =
  "2PACX-1vTWYPjf_5L68XOgNvbAwKjnE00XiQJ5f2Rz1QQVrone9zsD4V1mZAGgyG0GdXgBWHNhnBFho-qX_YKf";

const FramedChart = props => {
  const spreadsheetBaseUrl = "https://docs.google.com/spreadsheets/d/e/";
  const spreadsheetEnd =
    "/pubhtml?widget=true&amp;headers=false&amp;embedded=true";
  return (
    <iframe
      style={{
        position: "relative",
        overflow: "auto",
        height: 600,
        maxHeight: "100%",
        width: "100%",
        maxWidth: "100%",
        sandbox: "",
      }}
      src={spreadsheetBaseUrl + spreadsheetID + spreadsheetEnd}
    />
  );
};

const TSCI = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("weekly-counts")}
      title={"Top Site Compatibility Index"}
      subtitle={
        "Measuring user pain from webcompat issues (aggregated, mobile & desktop)"
      }
      shouldRenderCommonFilters={true}
      shouldRenderHeader={false}
      shouldRenderSimpleStat={false}
      renderChart={frameData => <FramedChart frameData={""} />}
    />
  );
};

export default TSCI;
