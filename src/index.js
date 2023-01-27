import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  resetArray = () => {
    const arr = [];
    for (let i = 0; i < 310; i++) {
      arr.push(Math.floor(Math.random() * (700 - 10 + 1) + 10));
    }
    this.setState({
      array: arr,
    });
  };

  componentDidMount() {
    this.resetArray();
  }
  render() {
    return (
      <div className="array">
        {this.state.array.map((value, ind) => (
          <div
            className="block"
            key={ind}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button
          onClick={() => {
            this.resetArray();
          }}
        >
          Generate New Array
        </button>
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
