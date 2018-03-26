/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Viewport, MainView } from "../components/Ui";
import NavigationContainer from "../containers/Navigation";
import NeedsDiagnosisContainer from "../containers/NeedsDiagnosis";
import HomePage from "../components/HomePage";

const App = props => {
  return (
    <Router>
      <Viewport>
        <NavigationContainer />
        <MainView>
          <Route exact path="/" component={HomePage} />
          <Route path="/needsdiagnosis" component={NeedsDiagnosisContainer} />
        </MainView>
      </Viewport>
    </Router>
  );
};

export default App;
