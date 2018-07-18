/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { shallow } from "enzyme";

import Button from "..";

it("renders Button default correctly", () => {
  const tree = renderer.create(<Button>{"I'm a Button"}</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Button: simulates handleClick events", () => {
  const onClick = sinon.spy();
  const wrapper = shallow(<Button onClick={onClick}>{"I'm a Button"}</Button>);
  wrapper.find("button").simulate("click");
  expect(onClick.calledOnce).toEqual(true);
});

it("renders Button: simulates handleBlur events", () => {
  const onBlur = sinon.spy();
  const wrapper = shallow(<Button onBlur={onBlur}>{"I'm a Button"}</Button>);
  wrapper.find("button").simulate("blur");
  expect(onBlur.calledOnce).toEqual(true);
});
