import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "../containers/navbar";
import LogoutPage from "../containers/logout-page";
import LandingPage from "../containers/landing-page";
import AuthPage from "../containers/auth-page";
import AcsInfraDemo from "../containers/acs-infra-demo";
import TriviaPage from "../containers/trivia-page";
import DebatePage from "../containers/debate-page";
import OpenCourtPage from "../containers/opencourt-page";
import PicksnPredictsPage from "../containers/picksnpredicts-page";
import Auth from "../containers/auth";
import store from "../store";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.getState().auth.get("username") !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Auth />
      <Navbar />
      <Route path="/login" exact>
        <AuthPage />
      </Route>
      <PrivateRoute path="/trivia" exact>
        <TriviaPage />
      </PrivateRoute>
      <PrivateRoute path="/debate" exact>
        <DebatePage />
      </PrivateRoute>
      <PrivateRoute path="/opencourt" exact>
        <OpenCourtPage />
      </PrivateRoute>
      <PrivateRoute path="/picksnpredictions" exact>
        <PicksnPredictsPage />
      </PrivateRoute>
      <Route path="/logout" exact>
        <LogoutPage />
      </Route>
      <PrivateRoute path="/acs" exact>
        <AcsInfraDemo />
      </PrivateRoute>
      <PrivateRoute path="/" exact>
        <LandingPage />
      </PrivateRoute>
    </Router>
  );
}

export default App;
