/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import normalizDate from "../normalizDate";

test("return a date as 2018-02-08", () => {
  const date = new Date("2018-02-08T13:12:16Z");
  expect(normalizDate(date, "-")).toBe("2018-02-08");
});

test("return a date as 2018/02/08", () => {
  const date = new Date("2018-02-08T13:12:16Z");
  expect(normalizDate(date)).toBe("2018/02/08");
});
