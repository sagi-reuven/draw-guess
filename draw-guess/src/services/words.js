import randomWords from "random-words";
let easy = randomWords({ exactly: 3, minLength: 3, maxLength: 4 });
const medium = randomWords({ exactly: 3, minLength: 5, maxLength: 6 });
const hard = randomWords({ exactly: 3, minLength: 6 });
const difficulty = {
  easy,
  medium,
  hard,
};

export default difficulty;
