import React from "react";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import MainSpace from "../../views/MainSpace";
import WorkBoard from "../../views/WorkBoard";
// перенести в src
const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={MainSpace} exact />
          <Route path="/workboard" component={WorkBoard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
