import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

class Input extends React.Component {
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

    return (
      <input
        className={classes.component}
        {...(style ? { style } : undefined)}
        {...(required ? { required: true } : undefined)}
        value={value}
        {...attrs}
        onChange={this.handleChange}
      />
    );
  }
}

Input.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  value: "",
  required: false,
  onChange() {},
};

export default Input;
