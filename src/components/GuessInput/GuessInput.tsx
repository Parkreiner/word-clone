import { useState } from "react";
import { Board } from "../../sharedTypes";
import Keyboard from "../Keyboard/";
import VisuallyHidden from "../VisuallyHidden";

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
    setCurrentGuess((currentGuess) => {
      if (currentGuess.length === 0) return currentGuess;
      return currentGuess.slice(0, currentGuess.length - 1);
    });
  };

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        commitGuess(currentGuess);
        setCurrentGuess("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        maxLength={5}
        pattern={guessMatcher.source}
        title="Text input must have five letters exactly"
        value={currentGuess}
        autoComplete="off"
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
        disabled={gameOver}
      />

      {/*
        The <Keyboard> component has a submit button, meaning that it overrides
        all other elements in the form and prevents non-submit elements from
        being able to submit or trigger form validation. Need to add invisible
        submit <input> for keyboard access and general acccessibility.
      */}
      <VisuallyHidden type="block">
        <label htmlFor="guess-submit">Submit guess</label>
        <input id="guess-submit" type="submit" />
      </VisuallyHidden>

      <Keyboard
        board={board}
        currentGuess={currentGuess}
        processLetter={processLetter}
        backspace={backspace}
      />
    </form>
  );
}
