/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import { ObjectNested, isEmptyObject } from "../../libraries";

/**
 * Normalize data relay on API and CHART
 * @param {data} object
 * @param {key} string
 * @return {object}
 */
export const normalize = (data = {}, key = null) => {
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
      return accumulator;
    },
    {
      [key]: [],
      dates: [],
    },
  );
};

/**
 * Determines the most, the least issues and the current issues
 * @param {stats} object
 * @return {object}
 */
export const mostAndLeast = (stats = {}) => {
  /* init default */
  const obj = {
    most: {
      count: null,
      date: null,
    },
    least: {
      count: null,
      date: null,
    },
    current: {
      count: null,
      date: null,
    },
  };
  /* if no data */
  if (isEmptyObject(stats)) {
    return obj;
  }
  return Object.keys(stats).reduce((accumulator, currentValue) => {
    const stat = stats[currentValue];
    const date = dayjs(new Date(stat.timestamp));
    const mostCount = ObjectNested.get(accumulator, "most.count");
    const leastCount = ObjectNested.get(accumulator, "least.count");
    let most = ObjectNested.get(accumulator, "most", {});
    let least = ObjectNested.get(accumulator, "least", {});
    let current = ObjectNested.get(accumulator, "current", {});

    /*
     * most
     */
    if (null == mostCount || stat.count >= mostCount) {
      most = {
        count: stat.count,
        date: date.format("YYYY-MM-DD"),
      };
    }

    /*
     * least
     */
    if (null == leastCount || stat.count < leastCount) {
      least = {
        count: stat.count,
        date: date.format("YYYY-MM-DD"),
      };
    }

    /*
     * current
     */
    if (dayjs().isSame(date, "day")) {
      current = {
        count: stat.count,
        date: date.format("YYYY-MM-DD"),
      };
    }
    return {
      most,
      least,
      current,
    };
  }, obj);
};

/**
 * needstriage, needscontact, and sitewait) started collecting date
 * Default Filters take car about min date
 * @param {string} minDate
 * @return {object}
 */
export const getTemporaryDefaultFilters = minDate => {
  const today = dayjs();
  const oneMonthBefore = today.subtract(1, "month");
  const to = today.format("YYYY-MM-DD");
  const from = oneMonthBefore.isBefore(dayjs(minDate))
    ? minDate
    : oneMonthBefore.format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
