import { combineReducers } from "redux";

import needsDiagnosis, {
  STATE_KEY as NEEDS_DIAGNOSIS_STATE_KEY,
} from "./modules/needsDiagnosis";

export default combineReducers({
  [NEEDS_DIAGNOSIS_STATE_KEY]: needsDiagnosis,
});
