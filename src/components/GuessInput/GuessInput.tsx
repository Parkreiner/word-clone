import { useLayoutEffect, useRef, useState } from "react";
import { Board, NonEmptyStatus } from "../../sharedTypes";
import OnScreenKeyboard from "../OnScreenKeyboard";
import VisuallyHidden from "../VisuallyHidden";

type Props = {
  board: Board;
  gameOver: boolean;
  commitGuess: (word: string) => void;
};

const statusSpecificity = {
  correct: 2,
  misplaced: 1,
  incorrect: 0,
} as const satisfies Record<NonEmptyStatus, number>;

function getLetterStatuses(board: Board): Map<string, NonEmptyStatus> {
  const letterStatuses = new Map<string, NonEmptyStatus>();

  for (const word of board) {
    for (const letter of word) {
      if (letter.status === "empty") {
        break;
      }

      const prevStatus = letterStatuses.get(letter.value);
      if (prevStatus === undefined) {
        letterStatuses.set(letter.value, letter.status);
        continue;
      }

      const newSpec = statusSpecificity[letter.status];
      const oldSpec = statusSpecificity[prevStatus];
      if (newSpec > oldSpec) {
        letterStatuses.set(letter.value, letter.status);
      }
    }
  }

  return letterStatuses;
}

export default function GuessInput({ board, gameOver, commitGuess }: Props) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const guessInputRef = useRef<HTMLInputElement>(null);
  const letterStatuses = getLetterStatuses(board);

  useLayoutEffect(() => {
    guessInputRef.current?.focus();
  }, [guessHistory.length]);

  const processLetter = (letter: string) => {
    if (currentGuess.length >= 5) return;
    setCurrentGuess(`${currentGuess}${letter}`);
  };

  const backspace = () => {
    if (currentGuess.length === 0) return;
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guessHistory.includes(currentGuess)) {
      commitGuess(currentGuess);
      setGuessHistory([...guessHistory, currentGuess]);
    }

    setCurrentGuess("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={submit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        ref={guessInputRef}
        type="text"
        required
        maxLength={5}
        pattern="[A-Z]{5}"
        title="Word must have five letters exactly"
        value={currentGuess}
        autoComplete="off"
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
        disabled={gameOver}
      />

      {/*
        The <Keyboard> component has a submit button, meaning that it overrides
        all other elements in the form and prevents non-submit elements from
        being able to submit or trigger form validation. Need to add invisible
        submit <input> for non-mouse interactivity/general acccessibility.
      */}
      <VisuallyHidden type="block">
        <label htmlFor="guess-submit">Submit guess</label>
        <input
          id="guess-submit"
          type="submit"
          disabled={gameOver}
          tabIndex={-1}
        />
      </VisuallyHidden>

      <OnScreenKeyboard
        letterStatuses={letterStatuses}
        backspaceEnabled={currentGuess.length > 0}
        processLetter={processLetter}
        backspace={backspace}
      />
    </form>
  );
}
