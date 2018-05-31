/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import toQueryObject from "../toQueryObject";

test("toQueryObject test", () => {
  const url = "http://localhost:3001/?from=2018-04-30&to=2018-05-31";
  const urlWithoutSearch = "http://localhost:3001/";
  expect(toQueryObject(url)).toEqual({ from: "2018-04-30", to: "2018-05-31" });
  expect(toQueryObject(urlWithoutSearch)).toEqual({
    "http://localhost:3001/": "undefined",
  });
  expect(toQueryObject()).toEqual({});
});
