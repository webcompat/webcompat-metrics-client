/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { shallow } from "enzyme";

import Header from "../../../components/Header";
import NavigationContainer from "../";

it("NavigationContainer click button", () => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return { matches: true };
    }),
  });
  const wrapper = shallow(
    <NavigationContainer>
      <div>Content</div>
    </NavigationContainer>,
  );
  expect(wrapper.state("isOpen")).toBeFalsy();
  wrapper.find(Header).simulate("click");
  expect(wrapper.state("isOpen")).toBeTruthy();
});
