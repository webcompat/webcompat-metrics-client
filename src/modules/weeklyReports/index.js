/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import {
  WEEKLY_REPORTS_REQUEST,
  WEEKLY_REPORTS_SUCCESS,
  WEEKLY_REPORTS_FAILURE,
} from "../../constants/ActionTypes";
import { CALL_API, GET } from "../../constants/Api";
import { CHART_LINE } from "../../constants/Charts";
import { ObjectNested, isEmptyObject } from "../../libraries";

/* name of reducer */
export const STATE_KEY = "weeklyreports";

const initialState = {
  stats: {},
};

/* reducer function */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WEEKLY_REPORTS_SUCCESS: {
      return {
        ...state,
        stats: mostAndLeast(
          ObjectNested.get(action, "response.json.timeline", {}),
        ),
        ...normalize(
          ObjectNested.get(action, "response.json.timeline", {}),
          ObjectNested.get(action, "actionParameters.chartList"),
          ObjectNested.get(action, "requestParameters"),
        ),
        isFetching: false,
        error: {},
      };
    }

    case WEEKLY_REPORTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: {},
      };
    }

    case WEEKLY_REPORTS_FAILURE: {
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
export const getWeeklyReports = args => ({
  [CALL_API]: {
    types: [
      WEEKLY_REPORTS_REQUEST,
      WEEKLY_REPORTS_SUCCESS,
      WEEKLY_REPORTS_FAILURE,
    ],
    endpoint: "weekly-counts",
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
            accumulator.newIssues.push(stat.count);
            accumulator.dates.push(new Date(stat.timestamp));
            return accumulator;
          },
          {
            newIssues: [],
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
 * Determines the most and the least issues
 * @param {stats} object
 * @return {object}
 */
const mostAndLeast = (stats = {}) => {
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
