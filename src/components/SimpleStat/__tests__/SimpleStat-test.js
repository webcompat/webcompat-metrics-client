/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import { SimpleStat } from "../";

it("renders SimpleStat default correctly", () => {
  const tree = renderer
    .create(
      <SimpleStat>
        <div>{"simple stat"}</div>
      </SimpleStat>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders SimpleStat default correctly with custom style", () => {
  const tree = renderer
    .create(
      <SimpleStat style={{ color: "red" }}>
        <div>{"simple stat"}</div>
      </SimpleStat>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
