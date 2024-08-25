import styles from "./Navbar.module.css";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Twidayooo Bot</h1>
      {currentUser?.user ? (
        <p
          className={
            styles.loggedInUser
          }>{`Hello, ${currentUser.user.displayName}`}</p>
      ) : null}
    </nav>
  );
}
