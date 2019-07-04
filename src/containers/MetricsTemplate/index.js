/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import request from "../../api";
import {
  ObjectNested,
  getFiltersFromUrl,
  toQueryObject,
  pushFiltersToUrl,
  toQueryString,
  isEmptyObject,
} from "../../libraries";
import Jumbotron from "../../components/Jumbotron";
import { Header, Fetch, Error, CommonFilters } from "../../components/Chart";
import Button from "../../components/Button";
import { SimpleStat, Stat } from "../../components/SimpleStat";

class MetricsTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.getDefaultCommonFilters(),
      isFetching: false,
      error: {},
      data: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
    this.handleErrorSubmit = this.handleErrorSubmit.bind(this);
    this.normalize = this.normalize.bind(this);
  }

  componentDidMount() {
    /* merge filters from url and local filters */
    const filters = {
      ...this.state.filters,
      ...toQueryObject(getFiltersFromUrl()),
    };
    /* sent request */
    this.getData(filters);
    /* update view with filters */
    this.setState({
      filters: {
        ...filters,
      },
    });
  }

  getDefaultCommonFilters() {
    if (this.props.shouldRenderCommonFilters) {
      return {
        from: dayjs()
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD"),
        ...this.props.injectedFilters,
      };
    }
    return this.props.injectedFilters;
  }

  /**
   *  Get dat from API
   * @param {object} filters
   */
  getData(filters = {}) {
    /* push filters to url */
    pushFiltersToUrl(toQueryString(filters));
    const args = {
      parameters: {
        ...filters,
      },
      endpoint: this.props.endpoint,
    };
    this.setState({
      isFetching: true,
    });
    request(args, {
      onSuccess: payload => this.handleSuccessSubmit(payload, filters),
      onError: payload => this.handleErrorSubmit(payload),
    });
  }

  /*
   * Get Formated Date: from - to
   * @param {object} filters
   * @return {string}
   */
  getFormatedDate(filters = {}) {
    const filterList = [];
    const from = ObjectNested.get(filters, "from");
    const to = ObjectNested.get(filters, "to");
    if (from) {
      filterList.push(dayjs(filters.from).format("DD MMMM YYYY"));
    }
    if (to) {
      filterList.push(dayjs(filters.to).format("DD MMMM YYYY"));
    }

    return filterList.length === 0
      ? "No date selected"
      : filterList.join(" - ");
  }

  getHeaderTitle(filters) {
    if (this.props.headerTitle != null) {
      return this.props.headerTitle;
    } else {
      return this.getFormatedDate(filters);
    }
  }

  handleChange(e) {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getData(this.state.filters);
  }

  /**
   * normalize data through function
   * @param {object} data
   * @param {object} filters
   */
  normalize(data, filters) {
    return this.props.normalizeData(data, filters);
  }

  handleSuccessSubmit(payload = {}, filters) {
    this.setState({
      isFetching: false,
      error: {},
      data: this.normalize(payload, filters),
    });
  }

  handleErrorSubmit(payload) {
    this.setState({
      isFetching: false,
      error: {
        message: ObjectNested.get(payload, "message", "Error"),
        errors: ObjectNested.get(payload, "errors", []),
        code: ObjectNested.get(payload, "code"),
      },
    });
  }

  renderFilters(handleChange, filters) {
    return (
      <React.Fragment>
        {this.props.shouldRenderCommonFilters ? (
          <CommonFilters onChange={handleChange} filters={filters} />
        ) : null}
        {this.props.renderFilters(handleChange, filters)}
      </React.Fragment>
    );
  }

  render() {
    const { filters, data } = this.state;
    const globalStats = ObjectNested.get(data, "globalStats", []);
    return (
      <section>
        {this.props.shouldRenderJumbotron && (
          <Jumbotron title={this.props.title} subtitle={this.props.subtitle} />
        )}

        {this.props.shouldRenderHeader && (
          <Header title={this.getHeaderTitle(filters)}>
            <form onSubmit={this.handleSubmit}>
              {this.renderFilters(this.handleChange, filters)}
              <Button type="submit">Filtered</Button>
            </form>
          </Header>
        )}

        {this.state.isFetching ? (
          <Fetch />
        ) : isEmptyObject(this.state.error) ? (
          <div style={{ position: "relative" }}>
            {this.props.shouldRenderSimpleStat &&
              !isEmptyObject(data) &&
              globalStats.length > 0 && (
                <SimpleStat>
                  {globalStats.map((stat, key) => {
                    return <Stat stat={stat} key={key} />;
                  })}
                </SimpleStat>
              )}
            {this.props.renderChart(data)}
          </div>
        ) : (
          <Error message={this.state.error.message} />
        )}
      </section>
    );
  }
}

MetricsTemplate.propTypes = {
  shouldRenderCommonFilters: PropTypes.bool,
  renderFilters: PropTypes.func,
  endpoint: PropTypes.string.isRequired,
  ...Jumbotron.propTypes,
  shouldRenderHeader: PropTypes.bool,
  shouldRenderJumbotron: PropTypes.bool,
  shouldRenderSimpleStat: PropTypes.bool,
  injectedFilters: PropTypes.object,
  renderChart: PropTypes.func.isRequired,
  normalizeData: PropTypes.func,
  headerTitle: PropTypes.string,
};

MetricsTemplate.defaultProps = {
  shouldRenderCommonFilters: true,
  renderFilters: () => {},
  shouldRenderHeader: true,
  shouldRenderJumbotron: true,
  shouldRenderSimpleStat: true,
  injectedFilters: {},
  normalizeData: () => {},
};

export default MetricsTemplate;
