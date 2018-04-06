/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Check if an object is empty ([] or {})
 * @param  {object} object
 * @return {boolean}
 */
const isEmptyObject = object => {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (Array.isArray(object)) {
    return object.length === 0;
  }
  return !Object.keys(object).length;
};

export default isEmptyObject;
