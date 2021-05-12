import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Projects from "./Projects"
import Tasks from "./Tasks"
import Entries from "./Entries"

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/entries">Entries</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact>
            <Entries />
          </Route>
          <Route path="/entries" exact>
            <Entries />
          </Route>
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
          <Route path="/projects" exact>
            <Projects />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default  App;
