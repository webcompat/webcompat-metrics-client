/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../";

it("renders Header default correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Header click button", () => {
  const onClick = sinon.spy();
  const wrapper = shallow(<Header onClick={onClick} />);
  wrapper.find("button").simulate("click");
  expect(onClick.calledOnce).toEqual(true);
});
