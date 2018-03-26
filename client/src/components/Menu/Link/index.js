/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRouter } from "react-router-dom";

import classes from "./styles.css";

const Link = ({ to, text, icon }) => {
  return (
    <LinkRouter to={to}>
      <div className={classes.component}>
        {icon && <div className={classes.icon}>{icon}</div>}
        {text && <div className={classes.text}>{text}</div>}
      </div>
    </LinkRouter>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Link.defaultProps = {
  text: null,
  icon: null,
};

export default Link;
