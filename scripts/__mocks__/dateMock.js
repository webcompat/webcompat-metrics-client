jest.mock("dayjs", () =>
  jest.fn((...args) =>
    jest.requireActual("dayjs")(
      args.filter((arg) => arg).length > 0 ? args : "1989-03-21",
    ),
  ),
);
