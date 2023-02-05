import { Board } from "../../sharedTypes";
import Guess from "../Guess";

type Props = {
  board: Board;
};

export default function BoardDisplay({ board }: Props) {
  return (
    <div className="guess-results">
      {board.map((word, rowIndex) => (
        <Guess key={rowIndex} word={word} />
      ))}
    </div>
  );
}
