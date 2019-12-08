/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import MetricsTemplate from "../MetricsTemplate";
import { Router } from "../../libraries";
import { VIEW_MODE_STATIC } from "../../constants/View";
import AspectRatio from "../../components/AspectRatio";

// const spreadsheetId = "1LYMeQdF6a6Mz6NsvgZBieWA90foINTVSM6pv_AapL2Y";

const FramedChart = frameData => {
  const spreadsheetBaseUrl = "https://docs.google.com/spreadsheets/d/e/";
  const spreadsheetId = frameData;
  const spreadsheetEnd =
    "/pubhtml?widget=true&amp;headers=false&amp;embedded=true";
  // "pubhtml?widget=true&amp;headers=false";
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
      title={"TSCI"}
      subtitle={
        "Measuring user pain from webcompat issues (aggregated, mobile & desktop)"
      }
      shouldRenderCommonFilters={false}
      shouldRenderHeader={false}
      shouldRenderSimpleStat={false}
      viewMode={VIEW_MODE_STATIC}
      renderChart={data => <FramedChart frameData={data} />}
    />
  );
};

export default TSCI;
