/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import AspectRatio from "..";

it("renders AspectRatio default correctly ", () => {
  const tree = renderer
    .create(
      <AspectRatio>
        <div>{"test"}</div>
      </AspectRatio>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders AspectRatio width 50% ratio correctly ", () => {
  const tree = renderer
    .create(
      <AspectRatio ratio={"50%"}>
        <div>{"test"}</div>
      </AspectRatio>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
