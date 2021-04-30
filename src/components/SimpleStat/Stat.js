/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import { ObjectNested } from "../../libraries";

import classes from "./SimpleStat.module.css";

const Stat = ({ stat }) => {
  const label = ObjectNested.get(stat, "label");
  const count = ObjectNested.get(stat, "count");
  const style = ObjectNested.get(stat, "style");

  return (
    <div {...(style ? { style } : undefined)} className={classes.stat}>
      {`${label} : ${count}`}
    </div>
  );
};

Stat.propTypes = {
  stat: PropTypes.shape({
    label: PropTypes.string.isRequired,
    count: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    style: PropTypes.object,
  }),
};

export default Stat;
