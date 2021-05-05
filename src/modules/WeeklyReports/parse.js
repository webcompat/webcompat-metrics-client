/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import { isEmptyObject } from "../../libraries";

/**
 * Normalize data relay on API and CHART
 * @param {object} data
 * @param {string} key
 * @return {object}
 */
export default function parse(data = {}, key = null) {
  if (isEmptyObject(data)) {
    return {};
  }
  /* key */
  if ("string" !== typeof key) {
    throw new Error("Specify a string key.");
  }

  return Object.keys(data).reduce(
    (accumulator, currentValue) => {
      const stat = data[currentValue];
      accumulator[key].push(stat.count);
      accumulator.dates.push(new Date(stat.timestamp));
      const endDate = stat.timestamp;
      accumulator.labels.push(
        `${dayjs(endDate).format("MMMM D, YYYY")} - ${dayjs(endDate)
          .add(6, "day")
          .format("MMMM D, YYYY")}`,
      );
      return accumulator;
    },
    {
      [key]: [],
      dates: [],
      labels: [],
    },
  );
}
