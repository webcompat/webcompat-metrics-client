/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";

import classes from "./Link.module.css";

const Link = ({ to, text, icon, onClick }) => {
  const router = useRouter();
  return (
    <NextLink href={to}>
      <a
        onClick={onClick}
        {...(router.pathname === to && {
          className: classes.active,
        })}>
        <div className={classes.component}>
          {icon && <div className={classes.icon}>{icon}</div>}
          {text && <div className={classes.text}>{text}</div>}
        </div>
      </a>
    </NextLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func.isRequired,
};

Link.defaultProps = {
  text: null,
  icon: null,
};

export default Link;
