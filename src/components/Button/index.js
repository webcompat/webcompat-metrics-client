import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleBlur(e) {
    this.props.onBlur(e);
  }

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    const { type, style, children } = this.props;

    return (
      <button
        type={type}
        style={style}
        className={classes.component}
        onClick={this.handleClick}
        onBlur={this.handleBlur}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: "button",
  onClick() {},
  onBlur() {},
  style: {},
};

export default Button;
