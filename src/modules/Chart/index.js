/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import { isEmptyObject } from "../../libraries";

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
 * Determines the most, the least and the current issues
 * @param {stats} object
 * @return {object}
 */
export const mostAndLeast = (stats = {}) => {
  /* init default */
  const obj = [];
  /* if no data */
  if (isEmptyObject(stats)) {
    return obj;
  }
  let most = {};
  let least = {};
  let current = {};
  for (const index in stats) {
    const stat = stats[index];
    const date = dayjs(new Date(stat.timestamp));
    const mostCount = most?.count;
    const leastCount = least?.count;

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
  }
  if (!isEmptyObject(least)) {
    obj.push({
      label: "Min",
      count: `${least.count} (${least.date})`,
      style: {
        color: "#00bdb4",
      },
    });
  }
  if (!isEmptyObject(most)) {
    obj.push({
      label: "Max",
      count: `${most.count} (${most.date})`,
      style: {
        color: "#fb3c59",
      },
    });
  }
  if (!isEmptyObject(current)) {
    obj.push({
      label: "Current",
      count: `${current.count} (${current.date})`,
      style: {
        color: "#58666e",
      },
    });
  }
  return obj;
};

/**
 * needstriage, needscontact, and sitewait) started collecting date
 * Default Filters take car about min date
 * @param {string} minDate
 * @return {object}
 */
export const getTemporaryDefaultFilters = (minDate) => {
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
