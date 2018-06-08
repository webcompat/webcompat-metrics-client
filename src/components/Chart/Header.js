/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

const Header = ({ title, style, children }) => {
  return (
    <header className={classes.header} style={style}>
      <section>
        <h3 className={classes.headerTitle}>{title}</h3>
      </section>
      {children && <section>{children}</section>}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Header.defaultProps = {
  style: {},
};

export default Header;
