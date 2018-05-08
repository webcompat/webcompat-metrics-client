/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import getDate from "./getDate";
import getMonth from "./getMonth";
/**
 * return a date exemple: 2018-02-12
 * @param  {date} Date
 * @return {string}
 */
const normalizDate = (date, separator = "/") => {
  if (date instanceof Date) {
    return `${date.getFullYear()}${separator}${getMonth(
      date,
    )}${separator}${getDate(date)}`;
  }
  throw new Error("Specify a Date.");
};

export default normalizDate;
