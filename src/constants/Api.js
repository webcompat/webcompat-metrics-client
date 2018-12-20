/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// methods
export const GET = "get";
export const POST = "post";
export const METHODS = [GET, POST];

/* default Config api */
export const CONFIG_API = {
  method: GET,
  mode: "cors",
};

/* default fallback */
export const CALLBACK_API = {
  onSuccess: payload => {},
  onError: payload => {},
  onFinish: (payload, isError) => {},
};

/* base API url */
export const API_BASE_URL = "https://webcompat-metrics.herokuapp.com/data";
