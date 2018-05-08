/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * return a month in 2 digit format
 * @param  {date} Date
 * @return {string}
 */
const getMonth = date => {
  if (date instanceof Date) {
    return `0${date.getMonth() + 1}`.slice(-2);
  }
  throw new Error("Specify a Date.");
};

export default getMonth;
