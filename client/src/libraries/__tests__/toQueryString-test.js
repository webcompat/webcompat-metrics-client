/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import toQueryString from "../toQueryString";

test("to query string", () => {
  const obj = { a: 2, d: [1, "two"], c: { foo: { bar: 1 } } };
  expect(toQueryString(obj)).toBe("a=2&d[0]=1&d[1]=two&c[foo][bar]=1");
  expect(toQueryString({})).toBe("");
  expect(toQueryString({ a: 2 })).toBe("a=2");
  expect(toQueryString(2)).toBe("");
});
