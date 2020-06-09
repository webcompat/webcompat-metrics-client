/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEmptyObject } from "../../libraries";
import { INTERVENTION_COUNTER_LIST } from "../../constants/Charts";

/**
 * Parse date from intervention endpoint
 * @param {object} data
 * @return {array}
 */
const parse = (data) => {
  if (isEmptyObject(data)) {
    return [];
  }

  const dates = [];

  for (const stat of data) {
    dates.push(new Date(stat.datetime));
    const counters = stat.counters;
    for (const property in counters) {
      const count = counters[property];
      if (INTERVENTION_COUNTER_LIST[property]) {
        INTERVENTION_COUNTER_LIST[property].data.push(count);
      }
    }
  }
  return {
    dates,
    counters: Object.values(INTERVENTION_COUNTER_LIST),
  };
};

export default parse;
