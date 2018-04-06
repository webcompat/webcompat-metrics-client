/**
 * Check if an object is empty ([] or {})
 * @param  {object} object
 * @return {boolean}
 */
const isEmptyObject = object => {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (Array.isArray(object)) {
    return object.length === 0;
  }
  return !Object.keys(object).length;
};

export default isEmptyObject;
