import type { Board, NonEmptyStatus, Status } from "../../sharedTypes";
import styles from "./Keyboard.module.css";

type Props = {
  board: Board;
  currentGuess: string;
  processLetter: (letter: string) => void;
  backspace: () => void;
};

const statusStyles = {
  correct: styles.correct,
  incorrect: styles.incorrect,
  misplaced: styles.misplaced,
  empty: "",
} as const satisfies Record<Status, string | undefined>;

// Could define these as const arrays, but that felt far less readable when
// trying to scan over them for typos
const row1: readonly string[] = "QWERTYUIOP".split("");
const row2: readonly string[] = "ASDFGHJKL".split("");
const row3: readonly string[] = "ZXCVBNM".split("");

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

export default function OnScreenKeyboard({
  board,
  currentGuess,
  processLetter,
  backspace,
}: Props) {
  const letterStatuses = getLetterStatuses(board);

  const toLetterKey = (letter: string, letterIndex: number) => {
    const letterStatus = letterStatuses.get(letter) ?? "empty";
    const statusStyle = statusStyles[letterStatus] ?? "";

    return (
      <button
        key={letterIndex}
        className={`${styles.keyboardCell} ${styles.keyboardCellLetter} ${statusStyle}`}
        type="button"
        onClick={() => processLetter(letter)}
      >
        {letter}
      </button>
    );
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{row1.map(toLetterKey)}</div>
      <div className={styles.keyboardRow}>{row2.map(toLetterKey)}</div>

      <div className={styles.keyboardRow}>
        <button
          type="button"
          className={`${styles.keyboardCell} ${styles.keyboardCellControl}`}
          onClick={backspace}
          disabled={currentGuess.length === 0}
        >
          Back
        </button>

        {row3.map(toLetterKey)}

        {/*
          Could add disabled attribute, but I think it's better feedback to send
          an invalid submit request and trigger the form validation message
          from the parent component upstream.
        */}
        <button
          type="submit"
          className={`${styles.keyboardCell} ${styles.keyboardCellControl}`}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
