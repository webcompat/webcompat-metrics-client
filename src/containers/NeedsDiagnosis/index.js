/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { getNeedsDiagnosis } from "../../actions";
import {
  ObjectNested,
  getFiltersFromUrl,
  toQueryObject,
  pushFiltersToUrl,
  toQueryString,
  isEmptyObject,
} from "../../libraries";
import LineChart from "../../components/LineChart";
import Jumbotron from "../../components/Jumbotron";
import { Header, Fetch, Error } from "../../components/Chart";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { CHART_LINE } from "../../constants/Charts";

class NeedsDiagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    /* merge filters from url and local filters */
    const filters = {
      ...this.state,
      ...toQueryObject(getFiltersFromUrl()),
    };
    /* sent request */
    this.getNeedsDiagnosis(filters);
    /* update view with filters */
    this.setState({
      ...filters,
    });
  }

  /* fetch data */
  getNeedsDiagnosis(filters = {}) {
    /* push filters to url */
    pushFiltersToUrl(toQueryString(filters));
    const args = {
      actionParameters: {
        chartList: [CHART_LINE],
      },
      requestParameters: {
        ...filters,
      },
    };
    this.props.getNeedsDiagnosis(args);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getNeedsDiagnosis(this.state);
  }

  render() {
    const from = dayjs(this.state.from).format("DD MMMM YYYY");
    const to = dayjs(this.state.to).format("DD MMMM YYYY");

    return (
      <section>
        <Jumbotron
          title="Needs diagnosis dashboard"
          subtitle="Tracking issue diagnosis burndown rate"
        />
        <Header title={`${from} - ${to}`}>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="date"
              name="from"
              placeholder="From"
              value={ObjectNested.get(this.state, "from", "")}
              onChange={this.handleChange}
            />
            <Input
              type="date"
              name="to"
              placeholder="To"
              value={ObjectNested.get(this.state, "to", "")}
              onChange={this.handleChange}
            />
            <Button type="submit">Filtered</Button>
          </form>
        </Header>
        {ObjectNested.get(this.props.stats, "isFetching", true) ? (
          <Fetch />
        ) : isEmptyObject(this.props.error) ? (
          <LineChart
            title={"Open issues in needsdiagnosis milestone"}
            label={""}
            labels={ObjectNested.get(
              this.props.stats,
              `${CHART_LINE}.dates`,
              [],
            )}
            legend={{ display: false }}
            data={ObjectNested.get(
              this.props.stats,
              `${CHART_LINE}.openIssues`,
              [],
            )}
          />
        ) : (
          <Error message={this.props.error.message} />
        )}
      </section>
    );
  }
}

NeedsDiagnosis.propTypes = {
  getNeedsDiagnosis: PropTypes.func.isRequired,
  stats: PropTypes.object,
  error: PropTypes.object,
};

NeedsDiagnosis.defaultProps = {
  stats: {},
  error: {},
};

export default connect(
  state => ({
    stats: ObjectNested.get(state, "needsdiagnosis", {}),
    error: ObjectNested.get(state, "needsdiagnosis.error", {}),
  }),
  dispatch => ({
    getNeedsDiagnosis: bindActionCreators(getNeedsDiagnosis, dispatch),
  }),
)(NeedsDiagnosis);
