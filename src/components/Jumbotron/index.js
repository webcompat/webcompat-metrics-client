/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./Jumbotron.module.css";

const Jumbotron = ({ title, subtitle, style }) => {
  return (
    <div className={classes.component} style={style}>
      <h2 className={classes.title}>{title}</h2>
      {subtitle && <h3 className={classes.subtitle}>{subtitle}</h3>}
    </div>
  );
};

Jumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  style: PropTypes.object,
};

Jumbotron.defaultProps = {
  style: {},
};

export default Jumbotron;
