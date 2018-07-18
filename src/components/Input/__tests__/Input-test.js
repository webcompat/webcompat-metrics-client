/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { shallow } from "enzyme";

import Input from "..";

it("renders Input default correctly", () => {
  const tree = renderer.create(<Input name="input" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Input with defaultValue", () => {
  const tree = renderer.create(<Input name="input" value="my name" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Input required", () => {
  const tree = renderer.create(<Input name="input" required={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Input with style injected", () => {
  const tree = renderer
    .create(<Input name="input" style={{ color: "red" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Input: simulates onChange events", () => {
  const onChange = sinon.spy();
  const event = { target: { name: "input", value: "test" } };
  const wrapper = shallow(<Input name="input" onChange={onChange} />);
  wrapper.find("input").simulate("change", event);
  expect(onChange.calledOnce).toEqual(true);
});

it("renders Input with a prop update", () => {
  const wrapper = shallow(<Input name="input" />);
  wrapper.setProps({ value: "new value" });
  expect(wrapper.props().value).toEqual("new value");
  wrapper.setProps({ value: "new value" });
});
