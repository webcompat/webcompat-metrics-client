import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

const AspectRatio = ({ children, ratio }) => {
  return (
    <div className={classes.component}>
      <div className={classes.ratio} style={{ paddingBottom: ratio }} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

AspectRatio.propTypes = {
  children: PropTypes.node.isRequired,
  ratio: PropTypes.string,
};

AspectRatio.defaultProps = {
  ratio: "100%",
};

export default AspectRatio;
