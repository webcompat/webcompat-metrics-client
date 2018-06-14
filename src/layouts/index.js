/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavigationContainer from "../containers/Navigation";
import NeedsDiagnosisContainer from "../containers/NeedsDiagnosis";
import { BASE_URL } from "../constants/Api";

const App = props => {
  return (
    <Router basename={BASE_URL}>
      <NavigationContainer>
        <Route exact path="/" component={NeedsDiagnosisContainer} />
        <Route path="/needsdiagnosis" component={NeedsDiagnosisContainer} />
      </NavigationContainer>
    </Router>
  );
};

export default App;
