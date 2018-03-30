import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunkMiddleware from "redux-thunk";

import reducer from "../reducers";

const initialState = {};
const middlewares = [thunkMiddleware];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
