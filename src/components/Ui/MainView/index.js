/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./MainView.module.css";

const MainView = ({ children, isCollapsed }) => {
  return (
    <main
      className={`${classes.component} ${
        isCollapsed ? classes.isCollapsed : ""
      }`}
      role="main">
      {children}
    </main>
  );
};

MainView.propTypes = {
  children: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
};

MainView.defaultProps = {
  isCollapsed: false,
};

export default MainView;
