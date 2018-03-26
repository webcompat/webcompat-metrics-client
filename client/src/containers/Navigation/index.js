/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Fragment } from "react";

import { PinningMenu, PinningHeader } from "../../components/Ui";
import Header from "../../components/Header";
import { Link } from "../../components/Menu";
import Svg from "../../components/Svg";
import SVGBugdiagnosis from "../../assets/svg/Bugdiagnosis.svg";

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleResize() {
    this.setState({
      isOpen: !window.matchMedia("(max-width: 42.5em)").matches,
    });
  }

  render() {
    return (
      <Fragment>
        <PinningHeader>
          <Header onClick={this.handleClick} />
        </PinningHeader>
        <PinningMenu isOpen={this.state.isOpen}>
          <Link
            to="/needsdiagnosis"
            text={"NeedsDiagnosis"}
            icon={<Svg svg={SVGBugdiagnosis} />}
          />
        </PinningMenu>
      </Fragment>
    );
  }
}

export default NavigationContainer;
