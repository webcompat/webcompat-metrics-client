/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import SVGInline from "react-svg-inline";
import PropTypes from "prop-types";

const Svg = props => {
  return (
    <SVGInline
      cleanup={[
        "title",
        "desc",
        "comment",
        "defs",
        "sketchMSShape",
        "sketchMSPage",
        "sketchMSLayerGroup",
      ]}
      {...props}
    />
  );
};

Svg.propTypes = {
  svg: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Svg;
