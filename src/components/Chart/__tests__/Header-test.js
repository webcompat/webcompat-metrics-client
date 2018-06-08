/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import { Header } from "../";

it("renders Header default correctly", () => {
  const tree = renderer
    .create(
      <Header title="I'm a title" style={{ color: "green" }}>
        <div>{"Header"}</div>
      </Header>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Header without style", () => {
  const tree = renderer
    .create(
      <Header title="I'm a title">
        <span>{"Header"}</span>
      </Header>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Header without children", () => {
  const tree = renderer.create(<Header title="I'm a title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
