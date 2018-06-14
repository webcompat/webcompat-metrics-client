/* default Config api */
export const CONFIG_API = {
  credentials: "include",
  method: "GET",
  mode: "cors",
};

/* base API url */
export const API_BASE_URL = "https://webcompat-metrics.herokuapp.com/data";

/* base url */
export const BASE_URL = "/webcompat-metrics-client";

/* Action key that carries API call info interpreted by this Redux middleware. */
export const CALL_API = "Call API";

// methods
export const GET = "get";
export const POST = "post";
export const METHODS = [GET, POST];
