/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

import Component from "..";

import store from "../../store/configureStore";

it("renders Component matchMedia return true", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  fetch.mockResponseOnce(
    JSON.stringify({
      about: "Hourly NeedsDiagnosis issues count",
      date_format: "w3c",
      timeline: [
        {
          count: "822",
          timestamp: "2018-02-08T13:12:16Z",
        },
        {
          count: "819",
          timestamp: "2018-02-08T15:00:00Z",
        },
        {
          count: "806",
          timestamp: "2018-02-09T15:00:03Z",
        },
      ],
    }),
  );
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return { matches: true };
    }),
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Component />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
