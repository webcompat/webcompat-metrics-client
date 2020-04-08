/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import MetricsTemplate from "../MetricsTemplate";
import Select from "../../components/Select";
import { Container } from "../../components/Chart";
import { Container as ContainerIssue, Issue } from "../../components/Issue";
import { ObjectNested } from "../../libraries";
import { parse } from "../../modules/Triage";
import { CARD_LAYOUT } from "../../constants/View";
import Router from "../../routes";

class Triage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: CARD_LAYOUT,
    };
    this.parseData = this.parseData.bind(this);
    this.getViewPrefRelayOnLocalStorage = this.getViewPrefRelayOnLocalStorage.bind(
      this,
    );
  }

  /**
   *
   * @param {object} data
   * @param {object} filters
   */
  parseData(data, filters) {
    // saved view pref
    this.savedViewPrefOnLocalStorage(
      ObjectNested.get(filters, "view", CARD_LAYOUT),
    );
    //
    this.setState({
      viewMode: ObjectNested.get(filters, "view", CARD_LAYOUT),
    });
    return {
      ...parse(data, filters),
    };
  }

  /**
   * get view pref relay on localStorage
   */
  getViewPrefRelayOnLocalStorage() {
    let localView;
    if (process.browser) {
      localView = localStorage.getItem("DashboardTriageView");
    }
    return localView ? localView : CARD_LAYOUT;
  }

  /**
   * saved view pref on localStorage
   */
  savedViewPrefOnLocalStorage(viewPref) {
    if (process.browser) {
      localStorage.setItem("DashboardTriageView", viewPref);
    }
  }

  render() {
    return (
      <MetricsTemplate
        endpoint={Router.getRoute("needstriage-list")}
        title={"Needs triage dashboard"}
        subtitle={"Tracking untriaged issues older than 48h"}
        normalizeData={this.parseData}
        headerTitle={""}
        shouldRenderCommonFilters={false}
        injectedFilters={{
          direction: "desc",
          sort: "created",
          view: this.getViewPrefRelayOnLocalStorage(),
        }}
        renderFilters={(handleChange, filters) => (
          <React.Fragment>
            <Select
              name="browserList"
              value={ObjectNested.get(filters, "browserList", "")}
              onChange={handleChange}
              optionList={[
                { label: "All browsers" },
                { label: "Firefox", value: "firefox" },
                { label: "Fenix", value: "fenix" },
                { label: "Chrome", value: "chrome" },
                { label: "Edge", value: "edge" },
                { label: "Safari", value: "safari" },
              ]}
            />
            <Select
              name="status"
              value={ObjectNested.get(filters, "status", "priority")}
              onChange={handleChange}
              optionList={[
                { label: "⏰ 48+ hours", value: "isOlder" },
                { label: "🛎 Needsinfox", value: "isNeedsinfo" },
              ]}
            />
            <Select
              name="direction"
              value={ObjectNested.get(filters, "direction", "asc")}
              onChange={handleChange}
              optionList={[
                { label: "Newest", value: "desc" },
                { label: "Oldest", value: "asc" },
              ]}
            />
            <Select
              name="view"
              value={ObjectNested.get(filters, "view", "card")}
              onChange={handleChange}
              optionList={[
                { label: "Card", value: "card" },
                { label: "List", value: "list" },
              ]}
            />
          </React.Fragment>
        )}
        renderChart={(data) => (
          <Container title={"Open issues in needstriage milestone"}>
            <ContainerIssue mode={this.state.viewMode}>
              {ObjectNested.get(data, "data", []).map((issue, key) => {
                return (
                  <Issue mode={this.state.viewMode} issue={issue} key={key} />
                );
              })}
            </ContainerIssue>
          </Container>
        )}
      />
    );
  }
}

export default Triage;
