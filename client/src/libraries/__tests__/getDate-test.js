/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getDate from "../getDate";

test("return a day in 2 digit format ", () => {
  const date = new Date("2018-02-08T13:12:16Z");
  expect(getDate(date)).toBe("08");
});
