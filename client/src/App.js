import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { guardaChaveGrupo } from "./dao/UserDao";
import Home from "./pages/Home";
import Preload from "./pages/Preload";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GrupForm from "./pages/GrupoForm";
import GrupoInfo from "./pages/GrupoInfo";
import Perfil from "./pages/Perfil";
import "./App.css";
import { Provider } from "@rollbar/react"; // <-- Provider imports 'rollbar' for us

// same configuration you would create for the Rollbar.js SDK
const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_CLINT_KEY,
  environment: "production",
  server: {
    root: process.env.REACT_APP_API,
    branch: "main",
  },
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function App() {
  const query = useQuery();
  const pGrupo = query.get("grupo");
  if (pGrupo && pGrupo !== "") {
    guardaChaveGrupo(pGrupo);
  }

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
