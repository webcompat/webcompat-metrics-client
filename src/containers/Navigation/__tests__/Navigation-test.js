/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import NavigationContainer from "..";

it("renders NavigationContainer default correctly", () => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return { matches: false };
    }),
  });
  const tree = renderer
    .create(
      <Router>
        <NavigationContainer>
          <div>Content</div>
        </NavigationContainer>
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
