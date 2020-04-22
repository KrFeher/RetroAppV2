import React, {useState} from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Retro from "./Retro";
import Admin from './Admin';
import LoginPage from "./LoginPage";

function App() {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage error={false}/>
          </Route>
          <Route path="/retro">
            <Retro />
          </Route>
          <Route path="/admin">
            {(authenticated ? <Admin /> : <LoginPage error={true}/>)}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
