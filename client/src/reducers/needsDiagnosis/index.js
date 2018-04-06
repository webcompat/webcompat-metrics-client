import {
  NEEDS_DIAGNOSIS_REQUEST,
  NEEDS_DIAGNOSIS_SUCCESS,
  NEEDS_DIAGNOSIS_FAILURE,
} from "../../constants/ActionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEEDS_DIAGNOSIS_SUCCESS: {
      return Object.assign({}, state, {
        payload: {},
      });
    }

    case NEEDS_DIAGNOSIS_REQUEST: {
      return Object.assign({}, state, {
        payload: {},
      });
    }

    case NEEDS_DIAGNOSIS_FAILURE: {
      return Object.assign({}, state, {
        payload: {},
      });
    }

    default: {
      return state;
    }
  }
};
