type Props = {
  answer: string;
  userWins: boolean;
  guessesUsed: number;
};

export default function GameOverBanner({
  answer,
  userWins,
  guessesUsed,
}: Props) {
  const guessText = `${guessesUsed} guess${guessesUsed === 1 ? "" : "es"}`;

  return (
    <div className={`banner ${userWins ? "happy" : "sad"}`}>
      <p>
        {userWins ? (
          <>
            <strong>Congratulations!</strong> You got it in{" "}
            <strong>{guessText}</strong>.
          </>
        ) : (
          <>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </>
        )}
      </p>
    </div>
  );
}
