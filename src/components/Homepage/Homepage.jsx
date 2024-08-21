import LoginBtn from "../LoginBtn/LoginBtn";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Have a nice day</h2>
      <LoginBtn />
      <LogoutBtn />
    </div>
  );
}
