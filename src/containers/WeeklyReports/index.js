/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { getWeeklyReports } from "../../actions";
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
import { Fetch, Error } from "../../components/Chart";
import { SimpleStat, Stat } from "../../components/SimpleStat";
import { CHART_LINE } from "../../constants/Charts";

class WeeklyReports extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* merge filters from url and local filters */
    const filters = {
      ...this.state,
      ...toQueryObject(getFiltersFromUrl()),
    };
    /* sent request */
    this.getWeeklyReports(filters);
    /* update view with filters */
    this.setState({
      ...filters,
    });
  }

  /* fetch data */
  getWeeklyReports(filters = {}) {
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
    this.props.getWeeklyReports(args);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getWeeklyReports(this.state);
  }

  render() {
    const globalStats = ObjectNested.get(this.props.stats, "stats", {});
    return (
      <section>
        <Jumbotron
          title="Weekly Issues Reported Dashboard"
          subtitle="Tracking weekly volume of new issues"
        />
        {ObjectNested.get(this.props.stats, "isFetching", true) ? (
          <Fetch />
        ) : isEmptyObject(this.props.error) ? (
          <div style={{ position: "relative" }}>
            {!isEmptyObject(globalStats) && (
              <SimpleStat>
                <Stat style={{ color: "#00bdb4" }}>
                  {`Min: ${ObjectNested.get(
                    globalStats,
                    "least.count",
                  )} (${ObjectNested.get(globalStats, "least.date")}) `}
                </Stat>
                <Stat style={{ color: "#fb3c59" }}>
                  {`Max: ${ObjectNested.get(
                    globalStats,
                    "most.count",
                  )} (${ObjectNested.get(globalStats, "most.date")}) `}
                </Stat>
              </SimpleStat>
            )}
            <LineChart
              title={"Issues Reported per Week"}
              fill={true}
              label={""}
              labels={ObjectNested.get(
                this.props.stats,
                `${CHART_LINE}.dates`,
                [],
              )}
              legend={{ display: true }}
              data={ObjectNested.get(
                this.props.stats,
                `${CHART_LINE}.newIssues`,
                [],
              )}
              options={{
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      distribution: "linear",
                    },
                  ],
                },
              }}
            />
          </div>
        ) : (
          <Error message={this.props.error.message} />
        )}
      </section>
    );
  }
}

WeeklyReports.propTypes = {
  getWeeklyReports: PropTypes.func.isRequired,
  stats: PropTypes.object,
  error: PropTypes.object,
};

WeeklyReports.defaultProps = {
  stats: {},
  error: {},
};

export default connect(
  state => ({
    stats: ObjectNested.get(state, "weeklyreports", {}),
    error: ObjectNested.get(state, "weeklyreports.error", {}),
  }),
  dispatch => ({
    getWeeklyReports: bindActionCreators(getWeeklyReports, dispatch),
  }),
)(WeeklyReports);
