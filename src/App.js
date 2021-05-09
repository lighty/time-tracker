import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Projects from "./Projects"
import Tasks from "./Tasks"

export default function App() {
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
          <Route path="/entries">
            <Entries />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Entries() {
  return <h2>Home</h2>;
}
