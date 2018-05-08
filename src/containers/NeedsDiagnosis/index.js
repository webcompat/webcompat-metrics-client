/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { getNeedsDiagnosis } from "../../actions";
import { ObjectNested } from "../../libraries";
import LineChart from "../../components/LineChart";
import { CHART_LINE } from "../../constants/Charts";

class NeedsDiagnosis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const args = {
      actionParameters: {
        chartList: [CHART_LINE],
      },
    };
    this.props.getNeedsDiagnosis(args);
  }

  render() {
    return (
      <LineChart
        label={"issues: "}
        labels={ObjectNested.get(this.props.stats, `${CHART_LINE}.dates`, [])}
        data={ObjectNested.get(
          this.props.stats,
          `${CHART_LINE}.openIssues`,
          [],
        )}
      />
    );
  }
}

NeedsDiagnosis.propTypes = {
  getNeedsDiagnosis: PropTypes.func.isRequired,
  stats: PropTypes.object,
};

NeedsDiagnosis.defaultProps = {
  stats: {},
};

export default connect(
  state => ({
    stats: ObjectNested.get(state, "needsdiagnosis", {}),
  }),
  dispatch => ({
    getNeedsDiagnosis: bindActionCreators(getNeedsDiagnosis, dispatch),
  }),
)(NeedsDiagnosis);
