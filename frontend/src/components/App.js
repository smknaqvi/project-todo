import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "../containers/navbar";
import LogoutPage from "../containers/logout-page";
import LandingPage from "../containers/landing-page";
import AuthPage from "../containers/auth-page";
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
      <Route path="/logout" exact>
        <LogoutPage />
      </Route>
      <PrivateRoute path="/" exact>
        <LandingPage />
      </PrivateRoute>
    </Router>
  );
}

export default App;
