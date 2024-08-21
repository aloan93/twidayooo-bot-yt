import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import LoginBtn from "../LoginBtn/LoginBtn";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import styles from "./Homepage.module.css";

export default function Homepage() {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Have a nice day</h2>
      {currentUser?.user ? <LogoutBtn /> : <LoginBtn />}
    </div>
  );
}
