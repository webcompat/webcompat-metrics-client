/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const getNestedVar = (item, key, defaultValue = null) => {
  const pieces = key.split(".");
  let object = item;
  for (let index = 0; index < pieces.length; index++) {
    const key = pieces[index];
    if (typeof object == "object" && object[key] !== undefined) {
      object = object[key];
    } else if (object[key] === undefined && index === pieces.length - 1) {
      return defaultValue;
    }
  }
  return object;
};

export default getNestedVar;
