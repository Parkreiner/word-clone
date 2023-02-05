import Banner from "../Banner";

type Props = {
  guessesUsed: number;
};

export default function WinBanner({ guessesUsed }: Props) {
  return (
    <Banner status="happy">
      <>
        <strong>Congratulations!</strong> You got it in{" "}
        <strong>
          {guessesUsed} guess{guessesUsed === 1 ? "" : "es"}
        </strong>
        .
      </>
    </Banner>
  );
}
