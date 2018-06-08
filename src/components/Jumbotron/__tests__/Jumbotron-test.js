/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import Jumbotron from "../";

it("renders Jumbotron default correctly with a title", () => {
  const tree = renderer.create(<Jumbotron title="Jumbotron title" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Jumbotron default correctly with a title and a subtitle", () => {
  const tree = renderer
    .create(<Jumbotron title="Jumbotron title" subtitle="Jumbotron subtitle" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Jumbotron default correctly with a style props", () => {
  const tree = renderer
    .create(
      <Jumbotron
        style={{ fontSize: "2rem" }}
        title="Jumbotron title"
        subtitle="Jumbotron subtitle"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
