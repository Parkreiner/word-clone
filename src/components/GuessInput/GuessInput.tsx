import { useState } from "react";
import { Board } from "../../sharedTypes";
import Keyboard from "../Keyboard/";

type Props = {
  board: Board;
  gameOver: boolean;
  commitGuess: (word: string) => void;
};

const guessMatcher = /^[A-Z]{5}$/i;

export default function GuessInput({ board, gameOver, commitGuess }: Props) {
  const [currentGuess, setCurrentGuess] = useState("");

  const processLetter = (letter: string) => {
    setCurrentGuess((currentGuess) => {
      if (currentGuess.length >= 5) return currentGuess;
      return `${currentGuess}${letter}`;
    });
  };

  const backspace = () => {
    setCurrentGuess((currentGuess) =>
      currentGuess.slice(0, currentGuess.length - 1)
    );
  };

  const enterGuess = () => {
    commitGuess(currentGuess);
    setCurrentGuess("");
  };

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        enterGuess();
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        maxLength={5}
        pattern={guessMatcher.source}
        disabled={gameOver}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
      />

      <Keyboard
        board={board}
        currentGuess={currentGuess}
        processLetter={processLetter}
        backspace={backspace}
        enter={enterGuess}
      />
    </form>
  );
}
