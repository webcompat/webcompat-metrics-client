import React from "react";
import PropTypes from "prop-types";

import { CARD_LAYOUT, CARD_LIST } from "../../constants/View";

import classes from "./Issue.module.css";

const Container = ({ children, mode }) => {
  return (
    <div className={`${classes.container} ${classes[mode]}`}>{children}</div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf([CARD_LAYOUT, CARD_LIST]),
};

Container.defaultProps = {
  mode: CARD_LAYOUT,
};

export default Container;
