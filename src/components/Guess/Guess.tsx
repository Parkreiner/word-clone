import { Letter, Status } from "../../sharedTypes";

type Props = {
  word: readonly Letter[];
};

const statusClasses = {
  correct: "correct",
  incorrect: "incorrect",
  misplaced: "misplaced",
  empty: "",
} as const satisfies Record<Status, string>;

export default function Guess({ word }: Props) {
  return (
    <p className="guess">
      {word.map(({ value, status }, letterIndex) => (
        <span key={letterIndex} className={`cell ${statusClasses[status]}`}>
          {value}
        </span>
      ))}
    </p>
  );
}
