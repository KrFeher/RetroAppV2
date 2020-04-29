import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Retro from "./Components/Retro";
import Admin from "./Components/Admin";
import LoginPage from "./Components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import api from "./api";
import actions from "./actions";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    api.startRealTimeUpdate(updateRetros);
  }, []);

  const updateRetros = (retros) => {
    dispatch(actions.setRetros(retros));
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/retro">
            <Retro />
          </Route>
          <Route path="/admin">{authenticated ? <Admin /> : <LoginPage />}</Route>
        </Switch>
      </Router>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
