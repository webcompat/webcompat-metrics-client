/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { getWeeklyReports } from "../../actions";
import {
  ObjectNested,
  getFiltersFromUrl,
  toQueryObject,
  pushFiltersToUrl,
  toQueryString,
  isEmptyObject,
} from "../../libraries";
import BarChart from "../../components/BarChart";
import Jumbotron from "../../components/Jumbotron";
import { Header, Fetch, Error } from "../../components/Chart";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SimpleStat, Stat } from "../../components/SimpleStat";
import { CHART_LINE } from "../../constants/Charts";

class WeeklyReports extends React.Component {
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
    const from = dayjs(this.state.from).format("DD MMMM YYYY");
    const to = dayjs(this.state.to).format("DD MMMM YYYY");
    const globalStats = ObjectNested.get(this.props.stats, "stats", {});
    return (
      <section>
        <Jumbotron
          title="Weekly Issues Reported Dashboard"
          subtitle="Tracking weekly volume of new issues"
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
            {!isEmptyObject(globalStats) ? (
              <BarChart
                title={"Issues Reported per Week"}
                fill={true}
                label={""}
                labels={ObjectNested.get(
                  this.props.stats,
                  `${CHART_LINE}.dates`,
                  [],
                )}
                legend={{ display: false }}
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
                        distribution: "series",
                        time: {
                          unit: "week",
                          isoWeekday: true,
                        },
                        stacked: true,
                      },
                    ],
                  },
                }}
              />
            ) : (
              <Error
                title={"No results"}
                message={
                  "To get more results, try adjusting your search by changing your dates"
                }
              />
            )}
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
