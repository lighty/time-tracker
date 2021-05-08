import React from "react";

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.state = {
      projects: [
        { name: 'reactの勉強' },
        { name: 'typescriptの勉強' },
      ],
      message: '',
    }
  }

  handleAddProject(name) {
    const projects = this.state.projects.concat([{name: name}]);
    this.setState({projects: projects, message: `${name}を追加しました`});
  }

  handleDeleteProject(name) {
    const newProjects = this.state.projects.filter((e) => e.name !== name);
    this.setState({projects: newProjects, message: `${name}を削除しました`});
  }

  render() {
    const projects = this.state.projects.map((project) => {
      return <li key={project.name}>{project.name} <DeleteForm onClick={this.handleDeleteProject} name={project.name}/></li>;
    });
    return (
      <div>
        <h2>Projects</h2>
        <p>{this.state.message}</p>
        <div><AddForm onSubmit={this.handleAddProject}/></div>
        <ul>{projects}</ul>
      </div>
    );
  }
}

class AddForm extends React.Component {
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
        <input type='submit' value='追加' />
      </form>
    );
  }
}

class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.name);
  }

  render() {
    return <button onClick={this.handleClick}>削除</button>;
  }
}
