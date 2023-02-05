import type { Board, Status } from "../../sharedTypes";
import styles from "./Keyboard.module.css";

type Props = {
  board: Board;
  currentGuess: string;
  processLetter: (letter: string) => void;
  backspace: () => void;
  enter: () => void;
};

const statusStyles = {
  correct: styles.correct,
  incorrect: styles.incorrect,
  misplaced: styles.misplaced,
  empty: "",
} as const satisfies Record<Status, string | undefined>;

const row1 = "QWERTYUIOP".split("");
const row2 = "ASDFGHJKL".split("");
const row3 = "ZXCVBNM".split("");

export default function Keyboard({
  board,
  currentGuess,
  processLetter,
  backspace,
  enter,
}: Props) {
  const lettersMap = new Map(
    board.flatMap((row) => {
      return row.map((letter) => [letter.value, letter.status]);
    })
  );

  const toLetterKeys = (letter: string, letterIndex: number) => {
    const keyStatus = lettersMap.get(letter) ?? "empty";
    return (
      <button
        key={letterIndex}
        className={`${styles.keyboardCell} ${styles.keyboardCellLetter} ${statusStyles[keyStatus]}`}
        type="button"
        onClick={() => processLetter(letter)}
      >
        {letter}
      </button>
    );
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{row1.map(toLetterKeys)}</div>
      <div className={styles.keyboardRow}>{row2.map(toLetterKeys)}</div>

      <div className={styles.keyboardRow}>
        <button
          type="button"
          className={`${styles.keyboardCell} ${styles.keyboardCellControl}`}
          onClick={backspace}
          disabled={currentGuess.length === 0}
        >
          Back
        </button>

        {row3.map(toLetterKeys)}

        <button
          type="button"
          className={`${styles.keyboardCell} ${styles.keyboardCellControl}`}
          onClick={enter}
          disabled={currentGuess.length < 5}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
