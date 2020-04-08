/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";

import SVGBugdiagnosis from "../../../../static/svg/Bugdiagnosis.svg";
import Link from "..";

it("renders Link default correctly", () => {
  const onClick = sinon.spy();
  const tree = renderer
    .create(
      <Link
        to="/weeklyreports"
        text={"Weekly Issue Reports"}
        icon={<SVGBugdiagnosis />}
        onClick={onClick}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
