/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import jsonFetch from "simple-json-fetch";

/**
 * Request
 * @param  {string} requestUrl url end_point
 * @param  {object} requestParameters
 * @param  {func} callback
 */
const request = (requestUrl = null, requestParameters, callback) => {
  if (null == requestUrl) {
    throw new Error(`url ${requestUrl} malformed `);
  }
  if ("function" != typeof callback) {
    throw new Error(`callback - ${callback} - is not a function`);
  }
  return dispatch => {
    return jsonFetch(requestUrl, requestParameters).then(
      response => {
        dispatch(callback(response, requestParameters));
      },
      response => {
        dispatch(callback(response, requestParameters, true));
      },
    );
  };
};

export default request;
