/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import MetricsTemplate from "../MetricsTemplate";
import { Router } from "../../libraries";
import { VIEW_MODE_STATIC } from "../../constants/View";
import AspectRatio from "../../components/AspectRatio";

// const spreadsheetID = "1238RmSUsSC8SfNS5bn-ogUvvE0bxQ82IULILm5GRu_Q";
const spreadsheetId =
  "2PACX-1vTWYPjf_5L68XOgNvbAwKjnE00XiQJ5f2Rz1QQVrone9zsD4V1mZAGgyG0GdXgBWHNhnBFho-qX_YKf";

const FramedChart = props => {
  const spreadsheetBaseUrl = "https://docs.google.com/spreadsheets/d/e/";
  const spreadsheetEnd =
    "/pubhtml?widget=true&amp;headers=false&amp;embedded=true";
  return (
    <AspectRatio>
      <iframe
        frameBorder="0"
        src={spreadsheetBaseUrl + spreadsheetId + spreadsheetEnd}
      />
    </AspectRatio>
  );
};

const TSCI = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("tsci-doc")}
      title={"Top Site Compatibility Index"}
      subtitle={
        "Measuring user pain from webcompat issues (aggregated, mobile & desktop)"
      }
      shouldRenderCommonFilters={false}
      shouldRenderHeader={false}
      shouldRenderSimpleStat={false}
      viewMode={VIEW_MODE_STATIC}
      renderChart={() => <FramedChart frameData={""} />}
    />
  );
};

export default TSCI;
