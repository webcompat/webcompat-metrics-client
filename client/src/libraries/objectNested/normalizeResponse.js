/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const normalizeResponse = (value, defaultValue) => {
  let result = value;
  switch (typeof value) {
    case "string":
      if (value.length === 0) {
        result = defaultValue;
      }
      break;
    case "object":
      if (value === null) {
        result = defaultValue;
      } else if (Array.isArray(value) && value.length === 0) {
        result = defaultValue;
      } else if (
        Object.keys(value).length === 0 &&
        Function.prototype.call.bind(Object.prototype.toString)(value) ===
          "[object Object]"
      ) {
        result = defaultValue;
      }
      break;
  }
  return result;
};

export default normalizeResponse;
