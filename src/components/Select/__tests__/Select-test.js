/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { shallow } from "enzyme";

import Component from "..";

it("renders Select default correctly", () => {
  const tree = renderer
    .create(
      <Component
        name="browserList"
        optionList={[
          { label: "All browsers" },
          { label: "Firefox", value: "firefox" },
          { label: "Chrome", value: "chrome" },
          { label: "Edge", value: "edge" },
          { label: "Safari", value: "safari" },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Select with defaultValue", () => {
  const tree = renderer
    .create(
      <Component
        name="browserList"
        value={"firefox"}
        optionList={[
          { label: "All browsers" },
          { label: "Firefox", value: "firefox" },
          { label: "Chrome", value: "chrome" },
          { label: "Edge", value: "edge" },
          { label: "Safari", value: "safari" },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Select required", () => {
  const tree = renderer
    .create(
      <Component
        name="browserList"
        value={"firefox"}
        required={true}
        optionList={[
          { label: "All browsers" },
          { label: "Firefox", value: "firefox" },
          { label: "Chrome", value: "chrome" },
          { label: "Edge", value: "edge" },
          { label: "Safari", value: "safari" },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Select with style injected", () => {
  const tree = renderer
    .create(
      <Component
        name="browserList"
        value={"firefox"}
        style={{ color: "red" }}
        optionList={[
          { label: "All browsers" },
          { label: "Firefox", value: "firefox" },
          { label: "Chrome", value: "chrome" },
          { label: "Edge", value: "edge" },
          { label: "Safari", value: "safari" },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Select: simulates onChange events", () => {
  const onChange = sinon.spy();
  const event = { target: { name: "browserList", value: "chrome" } };
  const wrapper = shallow(
    <Component
      name="browserList"
      value={"firefox"}
      optionList={[
        { label: "All browsers" },
        { label: "Firefox", value: "firefox" },
        { label: "Chrome", value: "chrome" },
        { label: "Edge", value: "edge" },
        { label: "Safari", value: "safari" },
      ]}
      onChange={onChange}
    />,
  );
  wrapper.find("select").simulate("change", event);
  expect(onChange.calledOnce).toEqual(true);
});
