import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
class Welcome extends Component {
  state = { gameInSession: false };

  async componentDidMount() {
    try {
      const res = await axios.get(
        "https://draw-guess-sagi-reuven.herokuapp.com/game/draw"
      );
      console.log(res);
      this.setState({ gameInSession: res.data === "no game" ? false : true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { gameInSession } = this.state;
    return (
      <>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-12">
              <p className="display-1 mt-5 pb-5">Welcome</p>
              <p className="display-2 mt-5">
                Draw <i className="bi bi-pencil-fill text-success"></i>
                Guess
              </p>
              {!gameInSession ? (
                <div>
                  <div>
                    <h3 className="mt-5">You Are Player 1</h3>
                  </div>
                  <Link
                    className="btn btn-outline-success mt-5"
                    to="/game/pick"
                  >
                    Start Game
                  </Link>
                </div>
              ) : (
                <div>
                  <div>
                    <h3 className="mt-5">You Are Player 2</h3>
                  </div>

                  <Link
                    className="btn btn-outline-success mt-5"
                    to="/game/inSession"
                  >
                    Enter A Game As Second Player
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Welcome;
