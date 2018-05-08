/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import ObjectNested from "../objectNested";

const obj = {
  receiver: {
    phone: "0000000000",
  },
};

test("normalizeResponse", () => {
  expect(ObjectNested.normalizeResponse("test", null)).toEqual("test");
  expect(ObjectNested.normalizeResponse("", null)).toEqual(null);
  expect(ObjectNested.normalizeResponse(obj.receiver, null)).toEqual({
    phone: "0000000000",
  });
  expect(ObjectNested.normalizeResponse({ phone: null }, null)).toEqual({
    phone: null,
  });
  expect(ObjectNested.normalizeResponse(null, null)).toEqual(null);
  expect(ObjectNested.normalizeResponse([], null)).toEqual(null);
  expect(ObjectNested.normalizeResponse({}, null)).toEqual(null);
});
