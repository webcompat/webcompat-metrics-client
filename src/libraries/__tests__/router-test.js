/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Router from "../router";

test("Router getRoute()", () => {
  Router.defineRoute("/needsdiagnosis-timeline", "needsdiagnosis-timeline", {
    baseUrl: "baseUrl",
  });

  expect(Router.getRoute("needsdiagnosis-timeline")).toEqual(
    "baseUrl/needsdiagnosis-timeline",
  );

  expect(() => {
    Router.getRoute();
  }).toThrow();

  expect(Router.getRoute("needsdiagnosis-timelines")).toEqual("");

  Router.defineRoute("/pdf/download/:id/:type", "pdf-download", {
    baseUrl: "baseUrl",
  });
  expect(Router.getRoute("pdf-download", { id: 123, type: "bills" })).toEqual(
    "baseUrl/pdf/download/123/bills",
  );
});

test("Router buildUrl()", () => {
  expect(Router.buildUrl("needsdiagnosis-timeline/", "api")).toEqual(
    "needsdiagnosis-timeline/api",
  );
});

test("Router stringfyUrl()", () => {
  expect(
    Router.stringfyUrl("/pdf/download/:id/:type", { id: 123, type: "bills" }),
  ).toEqual("/pdf/download/123/bills");
});
