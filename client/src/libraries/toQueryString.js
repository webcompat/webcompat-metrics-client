/**
 * Simply encode a base js object as {a:2, d:[1,"two"], c: {foo: {bar:1}}}
 * And returns URL encoded string : a=2&d[0]=1&d[1]=two&c[foo][bar]=1"
 *
 * @param  {Object} object A base javascript object : {}
 * @return {String} URL encoded query string
 */
const toQueryString = (object, base) => {
  const queryString = [];

  Object.keys(object).forEach(key => {
    let result;
    const value = object[key];

    if (base) {
      key = `${base}[${key}]`;
    }
    if (value) {
      switch (typeof value) {
        case "object":
          result = toQueryString(value, key);
          break;
        default:
          result = `${key}=${encodeURIComponent(value)}`;
      }
    }

    if (value) {
      queryString.push(result);
    }
  });
  return queryString.join("&");
};

export default toQueryString;
