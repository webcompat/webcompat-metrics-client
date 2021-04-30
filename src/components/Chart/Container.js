/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./Chart.module.css";

const Container = ({ children, title, style }) => {
  return (
    <article className={classes.container} {...(style ? { style } : undefined)}>
      <div className={classes.wrapper}>
        <h3 className={classes.title}>{title}</h3>
        <div>{children}</div>
      </div>
    </article>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
};

export default Container;
