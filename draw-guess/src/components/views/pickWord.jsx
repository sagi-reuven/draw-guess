import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import difficulty from "../../services/words";
import WordContainer from "../wordContainer.jsx";
class PickWord extends Component {
  state = {
    easy: null,
    medium: null,
    hard: null,
    word: "",
  };

  componentDidMount() {
    this.setState({
      easy: difficulty.easy,
      medium: difficulty.medium,
      hard: difficulty.hard,
    });
  }

  handleWordChoosing = async () => {
    const { word } = this.state;
    if (word === "") {
      return;
    }
    try {
      await axios.post(
        "https://draw-guess-sagi-reuven.herokuapp.com/game/word",
        { word }
      );
    } catch (err) {
      console.log(err);
    }
  };

  handleClick = ({ target }) => {
    this.setState({ word: target.innerText });
  };
  refresh = () => {
    window.location = "https://draw-guess-sagi-reuven.herokuapp.com/game/pick";
  };
  render() {
    const { easy, medium, hard, word } = this.state;
    return (
      <>
        <div className="container-fluid mt-5" id="main">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-5">Pick A Word</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h2 className="text-center">Easy</h2>

              <div className="word-container h3 d-flex justify-content-center align-items-center">
                <WordContainer word={easy} handleClick={this.handleClick} />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h2 className="text-center">Medium</h2>

              <div className="word-container h3 d-flex justify-content-center align-items-center">
                <WordContainer word={medium} handleClick={this.handleClick} />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h2 className="text-center">Hard</h2>

              <div className="word-container h3 d-flex justify-content-center align-items-center">
                <WordContainer word={hard} handleClick={this.handleClick} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-5 mt-5">
              {!word && (
                <h3 className="text-center text-success">Pick A Word</h3>
              )}
              {word && <h3 className="text-center">The Word Is ( {word} )</h3>}
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-success me-5" onClick={this.refresh}>
                Refresh Words
              </button>
              <Link
                to={"/game/start"}
                className="btn btn-success ms-5"
                onClick={this.handleWordChoosing}
              >
                Start Game
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PickWord;
