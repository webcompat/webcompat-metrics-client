/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import isEmptyObject from "../isEmptyObject";

test("isEmptyObject obj {}", () => {
  const obj = {};
  expect(isEmptyObject(obj)).toBeTruthy();
});

test("isEmptyObject obj {foo: 'bar'}", () => {
  const obj = { foo: "bar" };
  expect(isEmptyObject(obj)).toBeFalsy();
});

test("isEmptyObject array []", () => {
  const obj = [];
  expect(isEmptyObject(obj)).toBeTruthy();
});

test("isEmptyObject array ['foo', 'bar']", () => {
  const obj = ["foo", "bar"];
  expect(isEmptyObject(obj)).toBeFalsy();
});

test("isEmptyObject null", () => {
  const obj = null;
  expect(isEmptyObject(obj)).toBeFalsy();
});
