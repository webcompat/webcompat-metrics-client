import toQueryString from "../toQueryString";

test("to query string", () => {
  const obj = { a: 2, d: [1, "two"], c: { foo: { bar: 1 } } };
  expect(toQueryString(obj)).toBe("a=2&d[0]=1&d[1]=two&c[foo][bar]=1");
  expect(toQueryString({})).toBe("");
  expect(toQueryString({ a: 2 })).toBe("a=2");
  expect(toQueryString(2)).toBe("");
});
