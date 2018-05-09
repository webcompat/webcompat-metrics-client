/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import normalizeResponse from "./normalizeResponse";
import getNestedVar from "./getNestedVar";

const get = (item, key, defaultValue = null, normalize = true) => {
  let value = defaultValue;
  if (null != item && typeof item == "object" && !Array.isArray(item)) {
    if (item[key] !== undefined) {
      value = item[key];
    } else if (key.indexOf(".") > 0) {
      value = getNestedVar(item, key, defaultValue);
    }
    if (normalize) {
      return normalizeResponse(value, defaultValue);
    }
  }
  return value;
};

export default get;
