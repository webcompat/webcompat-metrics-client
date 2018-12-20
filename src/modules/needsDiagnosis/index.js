/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import { ObjectNested, isEmptyObject } from "../../libraries";

/**
 * Normalize data relay on API and CHART
 * @param {stats} object
 * @param {chartList} array
 * @return {object}
 */
export const normalize = (data = {}) => {
  if (isEmptyObject(data)) {
    return {};
  }
  return Object.keys(data).reduce(
    (accumulator, currentValue) => {
      const stat = data[currentValue];
      accumulator.openIssues.push(stat.count);
      accumulator.dates.push(new Date(stat.timestamp));
      return accumulator;
    },
    {
      openIssues: [],
      dates: [],
    },
  );
};

/**
 * Determines the most and the least issues
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
  };
  /* if no data */
  if (isEmptyObject(stats)) {
    return {};
  }
  return Object.keys(stats).reduce((accumulator, currentValue) => {
    const stat = stats[currentValue];
    const mostCount = ObjectNested.get(accumulator, "most.count");
    const leastCount = ObjectNested.get(accumulator, "least.count");
    let most = {};
    let least = {};
    /*
     * stat.count
     * stat.timestamp
     */
    if (null == mostCount || stat.count >= mostCount) {
      most = {
        count: stat.count,
        date: dayjs(new Date(stat.timestamp)).format("YYYY-MM-DD"),
      };
    }
    if (null == leastCount || stat.count < leastCount) {
      least = {
        count: stat.count,
        date: dayjs(new Date(stat.timestamp)).format("YYYY-MM-DD"),
      };
    }

    return {
      most: {
        ...accumulator.most,
        ...most,
      },
      least: {
        ...accumulator.least,
        ...least,
      },
    };
  }, obj);
};
