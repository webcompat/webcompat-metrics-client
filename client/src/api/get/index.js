/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { CONFIG_API } from "../../constants/Api";
import request from "../request";
import { isEmptyObject, toQueryString } from "../../libraries";

/**
 * Request get
 * @param  {string} requestUrl API end point
 * @param  {object} requestParameters
 * @param  {func} callback function callback
 */
const get = (requestUrl, requestParameters, callback) => {
  return dispatch => {
    let url = requestUrl;
    if (!isEmptyObject(requestParameters)) {
      const stringForm = toQueryString(requestParameters);
      url = `${requestUrl}?${stringForm}`;
    }
    dispatch(request(url, CONFIG_API, callback));
  };
};

export default get;
