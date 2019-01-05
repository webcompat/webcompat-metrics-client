/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import jsonFetch from "simple-json-fetch";

import { isEmptyObject, toQueryString, ObjectNested } from "../libraries";
import {
  CONFIG_API,
  API_BASE_URL,
  GET,
  CALLBACK_API,
  METHODS,
  POST,
} from "../constants/Api";

/**
 * Request get
 * @param  {string} requestUrl API end point
 * @param  {object} requestConfig
 * @param  {object} args configuration request args: { requestParameters: {}, actionParameters: {}, }
 * @param  {func} api function callback
 */
const request = (args = {}, callback = CALLBACK_API) => {
  const { config = CONFIG_API, parameters = {}, endpoint = null } = args;

  if (null == endpoint) {
    throw new Error(`requestEndPoint malformed ${endpoint}`);
  }

  /* init var */
  let requestUrl = `${API_BASE_URL}/${endpoint}`;
  let requestConfig = {
    ...CONFIG_API,
    ...config,
  };
  const method = ObjectNested.get(config, "method");

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

    requestConfig = {
      ...requestConfig,
      body: formData,
    };
  }

  return jsonFetch(requestUrl, requestConfig).then(
    response => callback.onSuccess(response.json),
    response => callback.onError(response),
  );
};

export default request;
