/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import dayjs from "dayjs";

import { isEmptyObject, ObjectNested } from "../../libraries";

/**
 * Normalize data relay on API and Triage
 * @param {data} object
 * @return {object}
 */
export const parse = (needstriageList = {}, filterList = {}) => {
  const currentDay = dayjs();

  const total = {
    count: 0,
    label: "Needstriage issues",
    style: {
      color: "currentColor",
    },
  };
  const older = {
    count: 0,
    label: "Older than 48h",
    style: {
      color: "currentColor",
    },
  };
  const needsinfo = {
    count: 0,
    label: "Needsinfo",
    style: {
      color: "currentColor",
    },
  };
  const data = [];

  for (const index in needstriageList) {
    const issue = needstriageList[index];
    // localIssue
    const localIssue = {
      number: issue.number,
      title: issue.title,
      createdAt: dayjs(issue.created_at).format("YYYY-MM-DD"),
      updatedAt: dayjs(issue.updated_at).format("YYYY-MM-DD"),
      browserList: getLabelList(issue.labels, "browser-"),
      isNeedsinfo: getLabelList(issue.label, "status-needsinfo").length > 0,
      isOlder: currentDay.diff(dayjs(issue.created_at), "day") > 2,
    };

    // increase count
    if (localIssue.isOlder) {
      older.count++;
    }

    // increase count
    if (localIssue.isNeedsinfo) {
      needsinfo.count++;
    }

    // increase total
    total.count++;

    //filtering data
    if (hasIncludeData(localIssue, filterList)) {
      data.push(localIssue);
    }
  }

  if (total.count >= 50) {
    total.style.color = "#c12600";
  }

  return {
    data,
    globalStats: [total, older, needsinfo],
  };
};

/**
 * Labels
 * @param {array} listLabel
 * @param {string} prefix
 * @return {array}
 */

export function getLabelList(listLabel = [], prefix = null) {
  const flattenListLabel = [];
  for (const label of listLabel) {
    const name = label.name;
    if (prefix != null) {
      if (name.startsWith(prefix)) {
        flattenListLabel.push(name.replace(prefix, ""));
      }
    } else {
      flattenListLabel.push(name);
    }
  }
  return flattenListLabel;
}

/**
 * filtering data relay on filters
 * @param {object} data
 * @param {object} filterList
 * @return {boolean}
 */
function hasIncludeData(issue = {}, filterList = {}) {
  let isIncluded = true;
  if (isEmptyObject(issue) || isEmptyObject(filterList)) {
    return isIncluded;
  }

  //browser
  const browser = ObjectNested.get(filterList, "browserList");
  if (browser) {
    isIncluded =
      undefined !==
      ObjectNested.get(issue, "browserList", []).find((currentBrowser) => {
        return browser.includes(currentBrowser);
      });
  }

  // status
  const status = ObjectNested.get(filterList, "status");
  if (status && isIncluded) {
    isIncluded = issue[status];
  }

  return isIncluded;
}
