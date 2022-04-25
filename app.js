const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Game } = require("./model/game");
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://sagi-reuven:sagilat@cluster0.kbojp.mongodb.net/draw?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/game/draw", async (req, res) => {
  let game = await Game.findOne({ started: true, finished: false });

  if (!game) {
    return res.send("no game");
  } else {
    return res.send("Game is on");
  }
});

app.get("/game/drawing", async (req, res) => {
  let game = await Game.findOne({ started: true, finished: false });
  if (game) {
    res.status(200).send(game.drawing);
  } else {
    res.status(404).send("no game found");
  }
});

app.post("/game/inSession", async (req, res) => {
  let game = await Game.findOneAndUpdate(
    { started: true, finished: false },
    { drawing: req.body.final }
  );
  if (game) {
    res.status(200).send("game updated");
  } else {
    res.status(200).send("game not found");
  }
});

app.post("/game/word", (req, res) => {
  let game = new Game({
    word: req.body.word,
    started: false,
    finished: false,
  });
  game.save();
  res.status(200).send("game saved");
});

app.post("/game/start", async (req, res) => {
  let game = await Game.findOne({
    started: false,
    finished: false,
  });
  if (game) {
    game.set({ started: true, gameStarted: Date.now() });
    game.save();
    res.status(200).send("Game starting");
  } else {
    res.status(200).send("Game Is Already In Session");
  }
});

// when user click to check a guess
app.post("/game/guess", async (req, res) => {
  let game = await Game.findOne({
    word: req.body.word,
    started: true,
    finished: false,
  });
  if (game) {
    game.set({ finished: true, gameFinished: Date.now() });
    game.save();
    res.status(200).send("You Are Correct!!! You Won");
  } else {
    res.send("Wrong Guess Try Again");
  }
});

app.listen(process.env.PORT || 4000, () => console.log(`listening`));
