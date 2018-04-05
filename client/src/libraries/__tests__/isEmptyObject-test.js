import isEmptyObject from "../isEmptyObject";

test("isEmptyObject obj {}", () => {
  const obj = {};
  expect(isEmptyObject(obj)).toBeTruthy();
});

test("isEmptyObject obj {foo: 'bar'}", () => {
  const obj = { foo: "bar" };
  expect(isEmptyObject(obj)).toBeFalsy();
});

test("isEmptyObject array []", () => {
  const obj = [];
  expect(isEmptyObject(obj)).toBeTruthy();
});

test("isEmptyObject array ['foo', 'bar']", () => {
  const obj = ["foo", "bar"];
  expect(isEmptyObject(obj)).toBeFalsy();
});

test("isEmptyObject null", () => {
  const obj = null;
  expect(isEmptyObject(obj)).toBeFalsy();
});
