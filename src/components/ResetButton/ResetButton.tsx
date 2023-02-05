import styles from "./ResetButton.module.css";

type Props = {
  visible: boolean;
  reset: () => void;
};

export default function ResetButton({ visible, reset }: Props) {
  return (
    <div className={styles.buttonContainer}>
      {visible ? (
        <button className={styles.resetButton} onClick={reset}>
          Get new word
        </button>
      ) : null}
    </div>
  );
}
