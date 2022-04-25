import "./App.css";
import Welcome from "./components/views/welcome";
import { Routes, Route } from "react-router-dom";
import StartGame from "./components/views/startGame";
import PickWord from "./components/views/pickWord";
import Player2 from "./components/views/player2";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game/start" element={<StartGame />} />
          <Route path="/game/pick" element={<PickWord />} />
          <Route path="/game/inSession" element={<Player2 />} />
        </Routes>
      }
    </div>
  );
}

export default App;
