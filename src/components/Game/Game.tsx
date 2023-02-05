import { useState } from "react";

import type { Board } from "../../sharedTypes";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";

import { sample } from "../../utils";
import { checkGuess } from "../../game-helpers";

import GuessInput from "../GuessInput";
import BoardDisplay from "../BoardDisplay";
import ResetButton from "../ResetButton";
import WinBanner from "../WinBanner";
import LoseBanner from "../LoseBanner";

function getAnswer(words: readonly string[]) {
  const answer = sample(words);
  if (answer === null) {
    throw new Error("Input array is empty");
  }

  return answer;
}

const initialAnswer = getAnswer(WORDS);
const initialBoard: Board = new Array(NUM_OF_GUESSES_ALLOWED)
  .fill(null)
  .map(() =>
    new Array(5).fill(5).map(() => {
      return { status: "empty", value: "" };
    })
  );

export default function Game() {
  const [answer, setAnswer] = useState(initialAnswer);
  const [board, setBoard] = useState(initialBoard);
  const [guessIndex, setGuessIndex] = useState(0);

  const userWins = board.some((word) =>
    word.every(({ status }) => status === "correct")
  );
  const gameOver = userWins || guessIndex >= NUM_OF_GUESSES_ALLOWED;

  console.info({ answer });

  const commitGuess = (newGuess: string) => {
    if (gameOver || newGuess.length !== 5) return;

    const comparisonResults = checkGuess(newGuess, answer);
    const boardCopy = board.map((word, index) => {
      if (index !== guessIndex) return word;
      return comparisonResults;
    });

    setBoard(boardCopy);
    setGuessIndex(guessIndex + 1);
  };

  const resetGame = () => {
    setAnswer(getAnswer(WORDS));
    setBoard(initialBoard);
    setGuessIndex(0);
  };

  return (
    <>
      <ResetButton reset={resetGame} visible={gameOver} />
      <BoardDisplay board={board} />
      <GuessInput gameOver={gameOver} commitGuess={commitGuess} board={board} />

      {gameOver &&
        (userWins ? (
          <WinBanner guessesUsed={guessIndex} />
        ) : (
          <LoseBanner answer={answer} />
        ))}
    </>
  );
}
