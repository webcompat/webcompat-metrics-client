/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

/**
 * test if a date isBetween two dates
 *
 * @param  {string} date
 * @param {string} from
 * @param {string} to
 * @param {string} format for all dates
 */
const isBetweenDates = (date, from, to, format = "YYYY-MM-DD") => {
  /* test params*/
  if ("string" !== typeof date) {
    throw new Error("Specify a string date");
  }
  if ("string" !== typeof from) {
    throw new Error("Specify a string from");
  }
  if ("string" !== typeof to) {
    throw new Error("Specify a string to");
  }

  /* init value */
  const dateDayjs = dayjs(date, format);
  const fromDayjs = dayjs(from, format);
  const toDayjs = dayjs(to, format);

  /* test date */
  if (dateDayjs.isSame(fromDayjs)) {
    return true;
  }
  if (dateDayjs.isSame(toDayjs)) {
    return true;
  }
  if (dateDayjs.isAfter(fromDayjs) && dateDayjs.isBefore(toDayjs)) {
    return true;
  }
  return false;
};

export default isBetweenDates;
