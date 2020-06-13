/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import Input from "../../components/Input";
import Select from "../../components/Select";
import { ObjectNested } from "../../libraries";

const Filters = ({ onChange, filters }) => {
  return (
    <React.Fragment>
      <Input
        type="date"
        name="start"
        placeholder="From"
        value={ObjectNested.get(filters, "start", "")}
        onChange={onChange}
      />
      <Input
        type="date"
        name="end"
        placeholder="To"
        value={ObjectNested.get(filters, "end", "")}
        onChange={onChange}
      />
      <Select
        name="distribution"
        value={ObjectNested.get(filters, "distribution", "upstream")}
        onChange={onChange}
        optionList={[
          { label: "Upstream", value: "upstream" },
          { label: "Android components", value: "android-components" },
          { label: "Mozilla central", value: "mozilla-central" },
          { label: "Mozilla beta", value: "mozilla-beta" },
          { label: "Mozilla release", value: "mozilla-release" },
        ]}
      />
      <Select
        name="type"
        value={ObjectNested.get(filters, "type", "all")}
        onChange={onChange}
        optionList={[
          { label: "All Interventions", value: "all" },
          { label: "CSS/JS injections", value: "injection" },
          { label: "User-Agent override", value: "ua_override" },
        ]}
      />
    </React.Fragment>
  );
};

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

Filters.defaultProps = {
  filters: {
    start: "",
    end: "",
  },
};

export default Filters;
