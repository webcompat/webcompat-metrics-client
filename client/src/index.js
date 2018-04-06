/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/configureStore";
import App from "./layouts";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("appMountPoint"),
);
