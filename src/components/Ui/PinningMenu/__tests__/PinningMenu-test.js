/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import PinningMenu from "../";

it("renders PinningMenu default correctly", () => {
  const tree = renderer
    .create(
      <PinningMenu>
        <span>content</span>
      </PinningMenu>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders PinningMenu mneu not opened correctly", () => {
  const tree = renderer
    .create(
      <PinningMenu isOpened={false}>
        <span>content</span>
      </PinningMenu>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
