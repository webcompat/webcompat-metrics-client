/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import Input from "../Input";

const CommonFilters = ({ onChange, filters, minFrom, minTo }) => {
  return (
    <React.Fragment>
      <Input
        type="date"
        name="from"
        placeholder="From"
        min={minFrom}
        value={filters?.from ?? ""}
        onChange={onChange}
      />
      <Input
        type="date"
        name="to"
        placeholder="To"
        min={minTo}
        value={filters?.to ?? ""}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

CommonFilters.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  minFrom: PropTypes.string,
  minTo: PropTypes.string,
};

CommonFilters.defaultProps = {
  filters: {
    from: "",
    to: "",
  },
  minFrom: "",
  minTo: "",
};

export default CommonFilters;
