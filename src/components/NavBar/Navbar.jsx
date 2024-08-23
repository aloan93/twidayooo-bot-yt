import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to="/" className={styles.navLink}>
          Twidayoo Bot
        </Link>
      </h1>
      {currentUser?.user ? (
        <p className={styles.loggedInUser}>{currentUser.user.displayName}</p>
      ) : null}
    </nav>
  );
}
