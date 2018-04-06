import {
  NEEDS_DIAGNOSIS_REQUEST,
  NEEDS_DIAGNOSIS_SUCCESS,
  NEEDS_DIAGNOSIS_FAILURE,
} from "../../constants/ActionTypes";
import { CALL_API, GET } from "../../constants/Api";

export const fetchNeedsDiagnosis = () => ({
  [CALL_API]: {
    types: [
      NEEDS_DIAGNOSIS_REQUEST,
      NEEDS_DIAGNOSIS_SUCCESS,
      NEEDS_DIAGNOSIS_FAILURE,
    ],
    endpoint: "needsdiagnosis",
    method: GET,
  },
});
