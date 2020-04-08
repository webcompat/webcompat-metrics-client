/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import SvgBulb from "../../static/svg/bulb.svg";

import classes from "./styles.css";
import Container from "./Container";

const Error = (props) => {
  return (
    <Container title={props.title}>
      <div className={classes.fetch}>
        <SvgBulb fill="#58666e" width={"7em"} height={"7em"} />
        <div className={classes.fetchTitle}>{props.message}</div>
      </div>
    </Container>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
};

Error.defaultProps = {
  title: "An error occurred during rendering the chart",
};

export default Error;
