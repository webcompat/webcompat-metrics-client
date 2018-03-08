import React, { Component } from "react";
import ReactDOM from "react-dom";

class ProxiedAPI extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }

  componentDidMount() {
    fetch("/api/needsdiagnosis").then(res =>
      res.json().then(data => {
        console.log(data);
        this.setState({ results: data });
      })
    );
  }

  render() {
    return (
      <div>
        <h1>Open the console</h1>
        we got this many things: {this.state.results.length}
      </div>
    );
  }
}

ReactDOM.render(<ProxiedAPI />, document.getElementById("appMountPoint"));
