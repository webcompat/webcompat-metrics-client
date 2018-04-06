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
