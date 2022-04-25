import React, { Component } from "react";
import Canvas from "../canvas";
import axios from "axios";
class StartGame extends Component {
  state = {
    gameStarted: false,
  };
  async componentDidMount() {
    await axios.post("http://localhost:4000/game/start", {});
  }
  async componentDidUpdate() {}
  handleRefresh = async () => {
    window.location = "/game/start";
  };
  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-12">
              <p className="display-1"> Start Drawing</p>
              <div className="mt-5 mb-5">
                <Canvas />
              </div>
              <div className="d-flex justify-content-center ">
                <button
                  className="btn btn-primary me-5"
                  onClick={this.handleRefresh}
                >
                  Refresh Drawing
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StartGame;