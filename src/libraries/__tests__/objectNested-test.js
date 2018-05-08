/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import ObjectNested from "../objectNested";

const obj1 = {
  receiver: {
    phone: "0000000000",
    mail: {
      pro: "example@example.fr",
      family: "example@example.me",
    },
  },
};

const date = new Date();

const obj2 = {
  a: {
    b: {
      c: date,
    },
  },
};
test("value obj", () => {
  expect(ObjectNested.get(obj1, "receiver.phone", null)).toBe("0000000000");
  expect(ObjectNested.get(obj1, "receiver", null)).toEqual({
    mail: { family: "example@example.me", pro: "example@example.fr" },
    phone: "0000000000",
  });
  expect(ObjectNested.get(obj1, "receiver.phones", null)).toBeNull;
  expect(ObjectNested.get(null, "receiver.phones", null)).toBeNull;
  expect(ObjectNested.get(null, "receiver.phones", "1")).toBe("1");
  expect(ObjectNested.get(obj1, "receiver.mail.pro", null)).toBe(
    "example@example.fr",
  );
  expect(ObjectNested.get(obj1, "receiver.mail.pro", "1", false)).toBe(
    "example@example.fr",
  );
  expect(ObjectNested.get(obj2, "a.b.c")).toBe(date);
});
