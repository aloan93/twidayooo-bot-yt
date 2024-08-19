import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to="/" className={styles.navLink}>
          Twidayoo Bot
        </Link>
      </h1>
      <p>placeholder...</p>
    </nav>
  );
}
