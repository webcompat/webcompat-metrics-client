/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.css";

const Links = ({ children }) => {
  return (
    <nav className={classes.links} role="navigation">
      {children}
    </nav>
  );
};

Links.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Links;
