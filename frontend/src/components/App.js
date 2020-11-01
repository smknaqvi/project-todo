import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "../containers/navbar";
import LogoutPage from "../containers/logout-page";
import AuthPage from "../containers/auth-page";
import AcsInfraDemo from "../containers/acs-infra-demo";
import TriviaPage from "../containers/trivia-page";
import DebatePage from "../containers/debate-page";
import OpenCourtPage from "../containers/opencourt-page";
import PicksPage from "../containers/picks-page";
import PredictionsPage from "../containers/predictions-page";
import PlayoffsPage from "../containers/playoffs-page";
import Auth from "../containers/auth";
import { isAuthorized } from "../utils/isAuthorized";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized() ? (
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
      <PrivateRoute path="/" exact>
        <OpenCourtPage />
      </PrivateRoute>
      <PrivateRoute path="/picks" exact>
        <PicksPage />
      </PrivateRoute>
      <PrivateRoute path="/predictions" exact>
        <PredictionsPage />
      </PrivateRoute>
      <PrivateRoute path="/playoffs" exact>
        <PlayoffsPage />
      </PrivateRoute>
      <Route path="/logout" exact>
        <LogoutPage />
      </Route>
      <PrivateRoute path="/acs" exact>
        <AcsInfraDemo />
      </PrivateRoute>
      <PrivateRoute path="/thezone" exact>
        <OpenCourtPage />
      </PrivateRoute>
      <Route path="/" render={() => <Redirect to="/thezone" />} exact />
    </Router>
  );
}

export default App;
