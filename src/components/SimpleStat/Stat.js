/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

const Stat = ({ children, style }) => {
  return (
    <div {...(style ? { style } : undefined)} className={classes.stat}>
      {children}
    </div>
  );
};

Stat.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Stat;
