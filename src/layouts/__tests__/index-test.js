/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import Component from "../";

it("renders Component default correctly", () => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return { matches: false };
    }),
  });
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
