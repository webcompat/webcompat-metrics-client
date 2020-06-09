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
    JSON.stringify([
      {
        datetime: "2020-01-01T00:00:39.937Z",
        counters: {
          all: 4,
          android: 30,
          desktop: 16,
        },
      },
      {
        datetime: "2020-01-02T00:00:48.263Z",
        counters: {
          all: 4,
          android: 30,
          desktop: 16,
        },
      },
      {
        datetime: "2020-01-03T00:00:45.413Z",
        counters: {
          all: 4,
          android: 30,
          desktop: 16,
        },
      },
    ]),
  );
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
