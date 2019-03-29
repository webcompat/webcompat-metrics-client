/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { shallow } from "enzyme";

import { CommonFilters } from "..";

const obj = {
  from: "2018-11-22",
  minFrom: "2018-11-22",
  to: "2018-12-22",
  minTo: "2018-11-22",
};

it("renders CommonFilters: simulates change events", () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<CommonFilters filters={obj} onChange={onChange} />);
  wrapper.find("[name='to']").simulate("change");
  expect(onChange.calledOnce).toEqual(true);
});

it("renders CommonFilters default correctly", () => {
  const onChange = sinon.spy();
  const tree = renderer
    .create(<CommonFilters filters={obj} onChange={onChange} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
