/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @param {filters}
 */
const pushFiltersToUrl = (filters = null) => {
  const replace = filters === null ? "" : `?${filters}`;
  history.replaceState({}, "", replace);
};

export default pushFiltersToUrl;
