/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {
  NEEDS_DIAGNOSIS_REQUEST,
  NEEDS_DIAGNOSIS_SUCCESS,
  NEEDS_DIAGNOSIS_FAILURE,
} from "../../constants/ActionTypes";
import { CALL_API, GET } from "../../constants/Api";
import { CHART_LINE } from "../../constants/Charts";
import { ObjectNested, isEmptyObject, normalizDate } from "../../libraries";
/* name of reducer */
export const STATE_KEY = "needsdiagnosis";

const initialState = {
  stats: {},
};

/* reducer function */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEEDS_DIAGNOSIS_SUCCESS: {
      return {
        ...state,
        ...normalize(
          ObjectNested.get(action, "response.json.timeline", {}),
          ObjectNested.get(action, "actionParameters.chartList"),
        ),
      };
    }

    case NEEDS_DIAGNOSIS_REQUEST: {
      return {
        ...state,
      };
    }

    case NEEDS_DIAGNOSIS_FAILURE: {
      return {
        ...state,
      };
    }

    default: {
      return initialState.stats;
    }
  }
}

// actions
export const getNeedsDiagnosis = args => ({
  [CALL_API]: {
    types: [
      NEEDS_DIAGNOSIS_REQUEST,
      NEEDS_DIAGNOSIS_SUCCESS,
      NEEDS_DIAGNOSIS_FAILURE,
    ],
    endpoint: "needsdiagnosis-timeline",
    method: GET,
    args,
  },
});

/**
 * Normalize data relay on API and CHART
 * @param {stats} object
 * @param {chartList} array
 * @return {object}
 */
const normalize = (stats = {}, chartList = []) => {
  const data = {
    ...initialState.stats,
  };
  if (isEmptyObject(stats)) {
    return data;
  }
  if (chartList.length <= 0) {
    return data;
  }
  const statsByChart = {};
  /* iterate chartList */
  for (const chart of chartList) {
    switch (chart) {
      /* normalize every type of chart relay on data */
      case CHART_LINE:
        statsByChart[CHART_LINE] = Object.keys(stats).reduce(
          (accumulator, currentValue) => {
            const stat = stats[currentValue];
            accumulator.openIssues.push(stat.count);
            const date = new Date(stat.timestamp);
            accumulator.dates.push(normalizDate(date, "-"));
            return accumulator;
          },
          {
            openIssues: [],
            dates: [],
          },
        );
        break;
      default:
    }
  }
  return statsByChart;
};
