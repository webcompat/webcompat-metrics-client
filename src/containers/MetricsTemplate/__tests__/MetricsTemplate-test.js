/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import { ObjectNested } from "../../../libraries";
import { mostAndLeast, normalize } from "../../../modules/Chart";
import LineChart from "../../../components/LineChart";

import Component from "..";

const handleData = data => {
  return {
    globalStats: mostAndLeast(data),
    chart: normalize(data, "newIssues"),
  };
};

jest.mock("react-chartjs-2", () => ({ Line: () => null }));

it("renders Component default correctly", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  fetch.mockResponseOnce(
    JSON.stringify({
      about: "Hourly NeedsDiagnosis issues count",
      date_format: "w3c",
      timeline: [
        {
          count: "822",
          timestamp: "2018-02-08T13:12:16Z",
        },
        {
          count: "819",
          timestamp: "2018-02-08T15:00:00Z",
        },
        {
          count: "806",
          timestamp: "2018-02-09T15:00:03Z",
        },
      ],
    }),
  );
  const component = renderer.create(
    <Component
      endpoint={"weekly-counts"}
      title={"Needs diagnosis dashboard"}
      subtitle={"Tracking issue diagnosis burndown rate"}
      normalizeData={handleData}
      renderChart={data => (
        <LineChart
          title={"Issues Reported per Week"}
          fill={true}
          label={""}
          labels={ObjectNested.get(data, "chart.dates", [])}
          legend={{ display: false }}
          data={ObjectNested.get(data, "chart.newIssues", [])}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                },
              ],
            },
          }}
        />
      )}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onSubmit;
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Component with custom props", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  fetch.mockResponseOnce(
    JSON.stringify({
      about: "Hourly NeedsDiagnosis issues count",
      date_format: "w3c",
      timeline: [
        {
          count: "822",
          timestamp: "2018-02-08T13:12:16Z",
        },
        {
          count: "819",
          timestamp: "2018-02-08T15:00:00Z",
        },
        {
          count: "806",
          timestamp: "2018-02-09T15:00:03Z",
        },
      ],
    }),
  );
  const tree = renderer
    .create(
      <Component
        endpoint={"weekly-counts"}
        title={"Needs diagnosis dashboard"}
        subtitle={"Tracking issue diagnosis burndown rate"}
        normalizeData={handleData}
        shouldRenderCommonFilters={false}
        shouldRenderHeader={false}
        shouldRenderJumbotron={false}
        shouldRenderSimpleStat={false}
        injectedFilters={{ from: "2018-12-25", to: "2019-01-01" }}
        renderChart={data => (
          <LineChart
            title={"Issues Reported per Week"}
            fill={true}
            label={""}
            labels={ObjectNested.get(data, "chart.dates", [])}
            legend={{ display: false }}
            data={ObjectNested.get(data, "chart.newIssues", [])}
            options={{
              scales: {
                xAxes: [
                  {
                    type: "time",
                    distribution: "linear",
                  },
                ],
              },
            }}
          />
        )}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
