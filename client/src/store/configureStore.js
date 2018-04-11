/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunkMiddleware from "redux-thunk";

import apiMiddleware from "../middlewares/api";
import reducer from "../reducer";

const initialState = {};
const middlewares = [thunkMiddleware, apiMiddleware];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
