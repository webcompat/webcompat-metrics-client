/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavigationContainer from "../containers/Navigation";
import NeedsDiagnosisContainer from "../containers/NeedsDiagnosis";
import NeedsTriageContainer from "../containers/NeedsTriage";
import NeedsContactContainer from "../containers/NeedsContact";
import SiteWaitContainer from "../containers/SiteWait";
import WeeklyReportsContainer from "../containers/WeeklyReports";

const App = props => {
  return (
    /* eslint-disable-next-line no-undef */
    <Router basename={process.env.PUBLIC_URL}>
      <NavigationContainer>
        <Route exact={true} path="/" component={WeeklyReportsContainer} />
        <Route path="/needsdiagnosis" component={NeedsDiagnosisContainer} />
        <Route path="/needstriage" component={NeedsTriageContainer} />
        <Route path="/needscontact" component={NeedsContactContainer} />
        <Route path="/sitewait" component={SiteWaitContainer} />
        <Route path="/weeklyreports" component={WeeklyReportsContainer} />
      </NavigationContainer>
    </Router>
  );
};

export default App;
