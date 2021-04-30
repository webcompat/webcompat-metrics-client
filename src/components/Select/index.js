/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./Select.module.css";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { required, style, value, ...attrs } = this.props;

    delete attrs.value;
    delete attrs.optionList;
    return (
      <div className={classes.component}>
        <select
          className={classes.select}
          {...(style ? { style } : undefined)}
          {...(required ? { required: true } : undefined)}
          value={value}
          {...attrs}
          onChange={this.handleChange}>
          {this.props.optionList.map((option, key) => {
            const value = option.value ? option.value : "";
            return (
              <option key={key} value={value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <div className={classes.arrow} aria-hidden="true" />
      </div>
    );
  }
}

Select.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  optionList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Select.defaultProps = {
  value: "",
  required: false,
  onChange() {},
};

export default Select;
