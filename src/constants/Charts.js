export const CHART_LINE = "CHART_LINE";

/**
 * needstriage, needscontact, and sitewait) started collecting date
 */

export const TEMP_MIN_DATE = "2019-03-28";

export const TYPE_CARD = "card";

/**
 * Interventions
 */

export const INTERVENTION_COUNTER_ALL_VALUE = "all";
export const INTERVENTION_COUNTER_ANDROID_VALUE = "android";
export const INTERVENTION_COUNTER_DESKTOP_VALUE = "desktop";

export const INTERVENTION_COUNTER_LIST = {
  [INTERVENTION_COUNTER_ALL_VALUE]: {
    label: "Universal",
    data: [],
    borderColor: "#EC932F",
    backgroundColor: "#EC932F",
    pointBorderColor: "#EC932F",
    pointBackgroundColor: "#EC932F",
    pointHoverBackgroundColor: "#EC932F",
    pointHoverBorderColor: "#EC932F",
    fill: "origin",
  },
  [INTERVENTION_COUNTER_ANDROID_VALUE]: {
    label: "Affecting android",
    data: [],
    borderColor: "#36a2eb",
    backgroundColor: "#36a2eb",
    pointBorderColor: "#36a2eb",
    pointBackgroundColor: "#36a2eb",
    pointHoverBackgroundColor: "#36a2eb",
    pointHoverBorderColor: "#36a2eb",
    fill: "0",
  },
  [INTERVENTION_COUNTER_DESKTOP_VALUE]: {
    label: "Affecting desktop",
    data: [],
    borderColor: "#ff6384",
    backgroundColor: "#ff6384",
    pointBorderColor: "#ff6384",
    pointBackgroundColor: "#ff6384",
    pointHoverBackgroundColor: "#ff6384",
    pointHoverBorderColor: "#ff6384",
    fill: "1",
  },
};
