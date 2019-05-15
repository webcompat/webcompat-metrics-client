/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../containers/Navigation";
import NeedsDiagnosis from "../containers/NeedsDiagnosis";
import { NeedsTriageChart, NeedsTriageCard } from "../containers/NeedsTriage";
import NeedsContact from "../containers/NeedsContact";
import SiteWait from "../containers/SiteWait";
import WeeklyReports from "../containers/WeeklyReports";

const App = props => {
  return (
    /* eslint-disable-next-line no-undef */
    <Router basename={process.env.PUBLIC_URL}>
      <Navigation>
        <Route exact={true} path="/" component={WeeklyReports} />
        <Route path="/needsdiagnosis" component={NeedsDiagnosis} />
        <Route path="/needstriage" component={NeedsTriageChart} />
        <Route path="/needscontact" component={NeedsContact} />
        <Route path="/sitewait" component={SiteWait} />
        <Route path="/weeklyreports" component={WeeklyReports} />
        <Route path="/needstriage-list" component={NeedsTriageCard} />
      </Navigation>
    </Router>
  );
};

export default App;
