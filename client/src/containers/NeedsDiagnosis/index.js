/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { fetchNeedsDiagnosis } from "../../actions/needsDiagnosis";

class NeedsDiagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchNeedsDiagnosis();
  }

  render() {
    return <div>NeedsDiagnosis</div>;
  }
}

NeedsDiagnosis.propTypes = {
  fetchNeedsDiagnosis: PropTypes.func.isRequired,
};

export default connect(null, dispatch => ({
  fetchNeedsDiagnosis: bindActionCreators(fetchNeedsDiagnosis, dispatch),
}))(NeedsDiagnosis);
