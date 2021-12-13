import React, { Component, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Preload from "./pages/Preload";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GrupForm from "./pages/GrupoForm";
import GrupoInfo from "./pages/GrupoInfo";
import Perfil from "./pages/Perfil";
import "./App.css";
import { Provider, ErrorBoundary } from "@rollbar/react"; // <-- Provider imports 'rollbar' for us

// same configuration you would create for the Rollbar.js SDK
const rollbarConfig = {
  accessToken: "271619f8003640acad2fdbd56d668e06",
  environment: "production",
  server: {
    root: process.env.REACT_APP_API,
    branch: "main",
  },
};

export default function App() {
  return (
    <Provider config={rollbarConfig}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/GrupForm">
            <GrupForm />
          </Route>
          <Route path="/GrupoInfo">
            <GrupoInfo />
          </Route>
          <Route path="/Perfil">
            <Perfil />
          </Route>
          v
          <Route path="/">
            <Preload />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
