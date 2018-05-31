/**
 * Simply decode a string as  http://example.com?a=2&d[0]=1&d[1]=two&c[foo][bar]=1
 * And returns an object : {a:2, d:[1,"two"], c: {foo: {bar:1}}}"
 *
 * @param  {string} url or uri
 * @return {Object}
 */
const toQueryObject = (string = null) => {
  if (null === string) {
    return {};
  }
  // init var
  const location = decodeURI(string);
  const hashPosition = location.indexOf("?");
  const hashes =
    hashPosition > -1
      ? location.slice(hashPosition + 1).split("&")
      : location.split("&");

  const obj = hashes.reduce((acc, value) => {
    const obj = value.split("=");
    acc[obj[0]] = decodeURIComponent(obj[1]);
    return acc;
  }, {});

  return obj;
};

export default toQueryObject;
