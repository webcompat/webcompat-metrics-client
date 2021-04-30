/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./SimpleStat.module.css";

const SimpleStat = ({ children, style }) => {
  return (
    <div {...(style ? { style } : undefined)} className={classes.component}>
      {children}
    </div>
  );
};

SimpleStat.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default SimpleStat;
