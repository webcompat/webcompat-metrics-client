/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import BarChart from "..";

jest.mock("react-chartjs-2", () => ({ Bar: () => <div>Chart</div> }));

it("renders BarChart default correctly", () => {
  const tree = renderer
    .create(
      <BarChart
        title={"Title BarCHart"}
        labels={["1", "2"]}
        data={["1000", "2000"]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
