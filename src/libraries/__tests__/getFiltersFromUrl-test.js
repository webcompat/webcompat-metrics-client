/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getFiltersFromUrl from "../getFiltersFromUrl";

test("getFiltersFromUrl", () => {
  expect(getFiltersFromUrl()).toBe("?from=2018-04-25&to=2018-05-25");
});
