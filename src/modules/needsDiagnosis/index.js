/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import {
  NEEDS_DIAGNOSIS_REQUEST,
  NEEDS_DIAGNOSIS_SUCCESS,
  NEEDS_DIAGNOSIS_FAILURE,
} from "../../constants/ActionTypes";
import { CALL_API, GET } from "../../constants/Api";
import { CHART_LINE } from "../../constants/Charts";
import { ObjectNested, isEmptyObject, isBetweenDates } from "../../libraries";

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
          ObjectNested.get(action, "requestParameters"),
        ),
        isFetching: false,
        error: {},
      };
    }

    case NEEDS_DIAGNOSIS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: {},
      };
    }

    case NEEDS_DIAGNOSIS_FAILURE: {
      return {
        ...state,
        error: {
          message: ObjectNested.get(action, "response.json.message"),
          errors: ObjectNested.get(action, "response.json.errors", []),
          code: ObjectNested.get(action, "response.json.code"),
        },
        isFetching: false,
      };
    }

    default: {
      return state;
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
const normalize = (stats = {}, chartList = [], filters = {}) => {
  const statsFiltered = filtering(stats, filters);
  const data = {
    ...initialState.stats,
  };
  if (isEmptyObject(statsFiltered)) {
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
        statsByChart[CHART_LINE] = Object.keys(statsFiltered).reduce(
          (accumulator, currentValue) => {
            const stat = statsFiltered[currentValue];
            accumulator.openIssues.push(stat.count);
            accumulator.dates.push(
              dayjs(new Date(stat.timestamp)).format("YYYY-MM-DD"),
            );
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

/**
 * filtering data, it's temporary until API does it
 * @param {stats} object
 * @param {filters} object
 * @return {object}
 */
const filtering = (stats = {}, filters = {}) => {
  if (isEmptyObject(filters)) {
    return stats;
  }
  const from = ObjectNested.get(filters, "from", null);
  const to = ObjectNested.get(filters, "to", null);
  if (null == from || null === to) {
    return stats;
  }
  return Object.keys(stats).reduce((accumulator, currentValue) => {
    const stat = stats[currentValue];
    if (
      isBetweenDates(
        dayjs(new Date(stat.timestamp)).format("YYYY-MM-DD"),
        from,
        to,
      )
    ) {
      accumulator.push(stat);
    }
    return accumulator;
  }, []);
};
