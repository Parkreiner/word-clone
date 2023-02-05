import type { Letter, Status } from "./sharedTypes";

export function checkGuess(guess: string, answer: string): readonly Letter[] {
  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  return guessChars.map((guessChar, index) => {
    const answerChar = answerChars[index];

    let status: Exclude<Status, "empty">;
    if (guessChar === answerChar) {
      status = "correct";
    } else if (answerChars.includes(guessChar)) {
      status = "misplaced";
    } else {
      status = "incorrect";
    }

    return {
      value: guessChar,
      status,
    };
  });
}
