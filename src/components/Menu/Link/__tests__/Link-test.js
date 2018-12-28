/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import sinon from "sinon";

import SVGBugdiagnosis from "../../../../assets/svg/Bugdiagnosis.svg";
import Svg from "../../../Svg";

import Link from "..";

it("renders Link default correctly", () => {
  const onClick = sinon.spy();
  const tree = renderer
    .create(
      <Router>
        <Link
          to="/weeklyreports"
          text={"Weekly Issue Reports"}
          icon={<Svg svg={SVGBugdiagnosis} />}
          onClick={onClick}
        />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
