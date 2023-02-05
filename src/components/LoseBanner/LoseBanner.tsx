import Banner from "../Banner";

type Props = {
  answer: string;
};

export default function LoseBanner({ answer }: Props) {
  return (
    <Banner status="sad">
      Sorry, the correct answer is <strong>{answer}</strong>.
    </Banner>
  );
}
