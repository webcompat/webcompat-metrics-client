/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import isBetweenDates from "../isBetweenDates";

test("isBetweenDates test return false", () => {
  const date = "2018-05-27";
  const from = "2018-04-25";
  const to = "2018-05-25";
  expect(isBetweenDates(date, from, to)).toBeFalsy();
});

test("isBetweenDates test return true", () => {
  const date = "2018-05-24";
  const from = "2018-04-25";
  const to = "2018-05-25";
  expect(isBetweenDates(date, from, to)).toBeTruthy();
});

test("isBetweenDates test return true date === to", () => {
  const date = "2018-05-25";
  const from = "2018-04-25";
  const to = "2018-05-25";
  expect(isBetweenDates(date, from, to)).toBeTruthy();
});

test("isBetweenDates test return true date === from", () => {
  const date = "2018-04-25";
  const from = "2018-04-25";
  const to = "2018-05-25";
  expect(isBetweenDates(date, from, to)).toBeTruthy();
});

test("isBetweenDates throw Specify a string date", () => {
  const from = "2018-04-25";
  const to = "2018-05-25";
  expect(() => {
    isBetweenDates(null, from, to);
  }).toThrow();
});

test("isBetweenDates throw Specify a string from", () => {
  const date = "2018-04-25";
  const to = "2018-05-25";
  expect(() => {
    isBetweenDates(date, null, to);
  }).toThrow();
});

test("isBetweenDates throw Specify a string to", () => {
  const date = "2018-05-24";
  const from = "2018-04-25";
  expect(() => {
    isBetweenDates(date, from);
  }).toThrow();
});
