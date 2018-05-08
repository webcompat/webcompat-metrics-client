/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import ObjectNested from "../objectNested";

const date = new Date();

const obj = {
  receiver: {
    phone: "0000000000",
  },
  a: {
    b: {
      c: date,
    },
  },
};
test("value of phone in obj is 0000000000", () => {
  expect(ObjectNested.getNestedVar(obj, "receiver.phone", null)).toBe(
    "0000000000",
  );
  expect(ObjectNested.getNestedVar(obj, "receiver", null)).toEqual({
    phone: "0000000000",
  });
  expect(ObjectNested.getNestedVar(obj, "receiver.email", null)).toBeNull;
  expect(ObjectNested.getNestedVar(obj, "receivers", "N/C")).toBe("N/C");
  expect(ObjectNested.getNestedVar(obj, "a.b.c", "N/C")).toBe(date);
});
