/* eslint-disable react/prop-types */
import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Current task: {this.props.sumOfTodos}</p>
      </div>
    );
  }
}

export default Counter;
