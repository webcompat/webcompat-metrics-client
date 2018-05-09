/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";
import Links from "./Links";
import Footer from "./Footer";

const PinningMenu = ({ children, isOpened }) => {
  return (
    <div className={`${classes.component} ${isOpened ? classes.isOpened : ""}`}>
      <div className={classes.container}>
        <Links>{children}</Links>
        <Footer />
      </div>
    </div>
  );
};

PinningMenu.propTypes = {
  children: PropTypes.node.isRequired,
  isOpened: PropTypes.bool,
};

PinningMenu.defaultProps = {
  isOpened: true,
};

export default PinningMenu;
