import React, { Component } from "react";
import Counter from "./Counter";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
      editingIndex: -1,
      inputEditVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo != e.target.dataset.todo),
    }));
  }

  handleEdit(e, index) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      editingIndex: index,
      inputEditVal: state.todos[index],
    }));
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      inputEditVal: e.target.value,
    }));
  }

  handleResubmit(e) {
    e.preventDefault();
    let updatedTodos = this.state.todos;
    updatedTodos[this.state.editingIndex] = this.state.inputEditVal;
    this.setState((state) => ({
      ...state,
      todos: updatedTodos,
      inputEditVal: "",
      editingIndex: -1,
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Counter sumOfTodos={this.state.todos.length}></Counter>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <React.Fragment key={todo + "_" + index}>
              {this.state.editingIndex === index ? (
                <li>
                  <form onSubmit={this.handleResubmit}>
                    <input
                      type="text"
                      value={this.state.inputEditVal}
                      onChange={this.handleEditChange}
                    />
                    <button type="submit">Resubmit</button>
                  </form>
                </li>
              ) : (
                <>
                  <li>{todo}</li>
                  <button
                    type="button"
                    onClick={(e) => this.handleEdit(e, index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    data-todo={todo}
                    onClick={(e) => this.handleDelete(e)}
                  >
                    Delete
                  </button>
                </>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
