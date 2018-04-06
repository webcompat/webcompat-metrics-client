import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunkMiddleware from "redux-thunk";

import apiMiddleware from "../middlewares/api";
import reducer from "../reducers";

const initialState = {};
const middlewares = [thunkMiddleware, apiMiddleware];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
