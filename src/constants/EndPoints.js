/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Router } from "../libraries";

import { API_BASE_URL, WEBCOMPAT_BASE_URl } from "./Api";

/*
 * Ochazuke endPoints
 */
Router.defineRoute("/needsdiagnosis-timeline", "needsdiagnosis-timeline", {
  baseUrl: API_BASE_URL,
});

Router.defineRoute("/needscontact-timeline", "needscontact-timeline", {
  baseUrl: API_BASE_URL,
});

Router.defineRoute("/needstriage-timeline", "needstriage-timeline", {
  baseUrl: API_BASE_URL,
});

Router.defineRoute("/sitewait-timeline", "sitewait-timeline", {
  baseUrl: API_BASE_URL,
});

Router.defineRoute("/weekly-counts", "weekly-counts", {
  baseUrl: API_BASE_URL,
});

/*
 * Webcompat endPoints
 */
Router.defineRoute("/issues/category/needstriage", "needstriage-list", {
  baseUrl: WEBCOMPAT_BASE_URl,
});
