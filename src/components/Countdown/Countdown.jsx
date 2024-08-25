import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

export default function Countdown({ timer }) {
  const [counter, setCounter] = useState(timer);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return <p className={styles.countdown}>Seconds remaining: {counter}</p>;
}
