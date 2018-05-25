import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });

    this.props.onChange(e);
  }

  render() {
    const { required, style, ...attrs } = this.props;

    delete attrs.value;
    delete attrs.defaultValue;

    return (
      <input
        className={classes.component}
        style={style}
        {...(required ? { required: true } : undefined)}
        value={this.state.value}
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
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  style: {},
  type: "text",
  defaultValue: "",
  required: false,
  onChange() {},
};

export default Input;
