/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import Viewport from "../";

it("renders Viewport default correctly", () => {
  const tree = renderer
    .create(
      <Viewport>
        <span>content</span>
      </Viewport>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
