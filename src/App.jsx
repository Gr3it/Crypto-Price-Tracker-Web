import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./Components/scrollToTop";
import Homepage from "./Homepage";
import Page_Not_Found from "./Page_Not_Found";

import "./CSS/General.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/" component={Page_Not_Found} />
      </Switch>
    </Router>
  );
}

export default App;
