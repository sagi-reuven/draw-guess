const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  word: {
    type: String,
  },
  started: {
    type: Boolean,
  },
  finished: {
    type: Boolean,
  },
  difficulty: {
    type: Number,
  },
  gameStarted: {
    type: Date,
  },
  gameFinished: {
    type: Date,
  },
  drawing: {
    data: Buffer,
    contentType: String,
  },
});

const Game = mongoose.model("Game", gameSchema);

exports.Game = Game;
