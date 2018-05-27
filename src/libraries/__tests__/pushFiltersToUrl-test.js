/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import pushFiltersToUrl from "../pushFiltersToUrl";
import getFiltersFromUrl from "../getFiltersFromUrl";

test("pushFiltersToUrl test with filters", () => {
  pushFiltersToUrl("from=2018-04-25&to=2018-05-26");
  expect(getFiltersFromUrl()).toBe("?from=2018-04-25&to=2018-05-26");
});

test("pushFiltersToUrl test with no filters", () => {
  pushFiltersToUrl();
  expect(getFiltersFromUrl()).toBe("?from=2018-04-25&to=2018-05-26");
});
