/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

const Chart = ({ children, title, style }) => {
  return (
    <article className={classes.component} style={style}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>{title}</h2>
        <div>{children}</div>
      </div>
    </article>
  );
};

Chart.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
};

Chart.defaultProps = {
  style: {},
};

export default Chart;
