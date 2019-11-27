/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import { Stat } from "..";

it("renders Stat default correctly", () => {
  const stat = {
    label: "test label",
    count: 3,
  };
  const tree = renderer
    .create(
      <Stat stat={stat}>
        <div>{"Stat"}</div>
      </Stat>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders SimpleStat default correctly with custom style", () => {
  const stat = {
    label: "test label",
    count: 3,
  };
  const tree = renderer
    .create(
      <Stat stat={stat} style={{ color: "blue" }}>
        <div>{"Stat"}</div>
      </Stat>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
