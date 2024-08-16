import { useState } from "react";

import Wordle from "./components/wordle/Wordle";
import { GameContainer } from "./App.Styled";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GameContainer>
        <Wordle />
      </GameContainer>
    </>
  );
}

export default App;
