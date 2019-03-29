/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import Component from "..";

jest.mock("react-chartjs-2", () => ({ Line: () => null }));

it("renders Component default correctly", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  fetch.mockResponseOnce(
    JSON.stringify({
      about: "Hourly NeedsContact issues count",
      date_format: "w3c",
      timeline: [
        {
          count: "124",
          timestamp: "2019-03-16T13:12:16Z",
        },
        {
          count: "816",
          timestamp: "2019-03-17T15:00:00Z",
        },
        {
          count: "614",
          timestamp: "2019-03-18T18:00:03Z",
        },
      ],
    }),
  );
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
