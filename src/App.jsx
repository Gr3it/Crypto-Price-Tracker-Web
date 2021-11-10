import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./Components/scrollToTop";
import Homepage from "./Homepage";
import Page_Not_Found from "./Page_Not_Found";
import Settings from "./Components/Settings";
import CryptoPage from "./Components/CryptoPage";

import "./CSS/General.css";

function App() {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [theme, setTheme] = useState("Dark");

  useEffect(() => {
    if (theme === "Dark") {
      document.getElementById("root").classList.add("dark-theme");
      document.getElementById("root").classList.remove("light-theme");
    }
    if (theme === "Light") {
      document.getElementById("root").classList.add("light-theme");
      document.getElementById("root").classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <Router>
      <Settings
        currency={currency}
        setCurrency={(value) => setCurrency(value)}
        theme={theme}
        setTheme={(value) => setTheme(value)}
        setCurrencySymbol={(value) => setCurrencySymbol(value)}
      />
      <ScrollToTop />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Homepage currencySymbol={currencySymbol} currency={currency} />
          )}
        />
        <Route
          path="/crypto/:id"
          exact
          render={(props) => (
            <CryptoPage
              currency={currency}
              currencySymbol={currencySymbol}
              theme={theme}
              {...props}
            />
          )}
        />
        <Route path="/" component={Page_Not_Found} />
      </Switch>
    </Router>
  );
}

export default App;
