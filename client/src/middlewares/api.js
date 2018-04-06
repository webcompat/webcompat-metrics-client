/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*  inspired by https://github.com/reactjs/redux/tree/master/examples/real-world */
import jsonFetch from "simple-json-fetch";

import { isEmptyObject, toQueryString } from "../libraries";
import {
  CONFIG_API,
  API_BASE_URL,
  CALL_API,
  GET,
  POST,
  METHODS,
} from "../constants/Api";

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const actionConfig = action[CALL_API];
  if (typeof actionConfig === "undefined") {
    return next(action);
  }

  /* init var */
  const { types, endpoint, parameters, method } = actionConfig;
  let requestUrl = `${API_BASE_URL}/${endpoint}`;
  let requestConfig = CONFIG_API;

  /* test all values */
  /* endpoint */
  if ("string" !== typeof endpoint) {
    throw new Error("Specify a string endpoint URL.");
  }

  /* types must be an array : [ACTION_REQUEST, ACTION_SUCCESS, ACTION_FAILURE] */
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  /* methods : get or post */
  if ("string" !== typeof method) {
    throw new Error("Specify a string method.");
  }

  if (!METHODS.includes(method)) {
    throw new Error("Expected method to be get or post.");
  }

  if (GET === method && !isEmptyObject(parameters)) {
    requestUrl = `${requestUrl}?${toQueryString(parameters)}`;
  }

  if (POST === method && !isEmptyObject(parameters)) {
    const formData = new FormData();
    Object.keys(parameters).forEach(key => {
      // Case array / object
      if ("object" === typeof parameters[key]) {
        for (const i in parameters[key]) {
          formData.append(`${key}[${i}]`, parameters[key][i]);
        }
      } else {
        formData.append(key, parameters[key]);
      }
    });

    requestConfig = Object.assign({}, CONFIG_API, {
      method: "post",
      body: formData,
    });
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  /* fetching */
  return jsonFetch(requestUrl, requestConfig).then(
    response =>
      next(
        actionWith({
          response,
          type: successType,
        }),
      ),
    response =>
      next(
        actionWith({
          response,
          type: failureType,
        }),
      ),
  );
};
