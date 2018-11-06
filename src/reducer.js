import { combineReducers } from "redux";

import needsDiagnosis, {
  STATE_KEY as NEEDS_DIAGNOSIS_STATE_KEY,
} from "./modules/needsDiagnosis";

import weeklyReports, {
  STATE_KEY as WEEKLY_REPORTS_STATE_KEY,
} from "./modules/weeklyReports";

export default combineReducers({
  [NEEDS_DIAGNOSIS_STATE_KEY]: needsDiagnosis,
  [WEEKLY_REPORTS_STATE_KEY]: weeklyReports,
});
