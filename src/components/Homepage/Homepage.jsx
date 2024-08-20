// import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import LoginBtn from "../LoginBtn/LoginBtn";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import styles from "./Homepage.module.css";

export default function Homepage() {
  // function checkScopes() {
  //   console.log(
  //     hasGrantedAllScopesGoogle(
  //       tokenResponse,
  //       "https://www.googleapis.com/auth/youtube",
  //       "https://www.googleapis.com/auth/youtube.readonly",
  //       "https://www.googleapis.com/auth/youtube.force-ssl"
  //     )
  //   );
  // }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Have a nice day</h2>
      <LoginBtn />
      <LogoutBtn />
      <button onClick={checkScopes}>Check Scopes</button>
    </div>
  );
}
