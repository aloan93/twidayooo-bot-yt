import styles from "./Error.module.css";

export default function Error({ err }) {
  return <p className={styles.error}>{err}</p>;
}
