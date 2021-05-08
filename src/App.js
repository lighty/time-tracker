import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

function Tasks() {
  return <h2>About</h2>;
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      projects: [
        { name: 'reactの勉強' },
        { name: 'typescriptの勉強' },
      ],
      message: '',
    }
  }

  handleSubmit(name) {
    const projects = this.state.projects.concat([{name: name}]);
    this.setState({projects: projects, message: '登録しました'});
  }

  render() {
    const projects = this.state.projects.map((project) => <li key={project.name}>{project.name}</li>);
    return (
      <div>
        <h2>Projects</h2>
        <p>{this.state.message}</p>
        <div><ProjectForm onSubmit={this.handleSubmit}/></div>
        <ul>{projects}</ul>
      </div>
    );
  }
}

// 制御されたコンポーネントを書いてみる
class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.value} onChange={this.handleChange} />
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
