/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import {
  PinningMenu,
  PinningHeader,
  MainView,
  Viewport,
} from "../../components/Ui";
import Header from "../../components/Header";
import { Link } from "../../components/Menu";
import Svg from "../../components/Svg";
import SVGBugdiagnosis from "../../assets/svg/Bugdiagnosis.svg";

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: true,
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
      isOpened: !this.state.isOpened,
    });
  }

  handleResize() {
    this.setState({
      isOpened: !window.matchMedia("(max-width: 42.5em)").matches,
    });
  }

  render() {
    return (
      <Viewport>
        <PinningHeader>
          <Header onClick={this.handleClick} />
        </PinningHeader>
        <PinningMenu isOpened={this.state.isOpened}>
          <Link
            to="/needsdiagnosis"
            text={"NeedsDiagnosis"}
            icon={<Svg svg={SVGBugdiagnosis} />}
            onClick={this.handleResize}
          />
        </PinningMenu>
        <MainView isCollapsed={!this.state.isOpened}>
          {this.props.children}
        </MainView>
      </Viewport>
    );
  }
}

NavigationContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationContainer;
