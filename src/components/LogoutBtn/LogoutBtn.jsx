import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import styles from "./LogoutBtn.module.css";

export default function LogoutBtn() {
  const { logOut, setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogOut(e) {
    e.preventDefault();
    setIsLoading(true);
    logOut()
      .then(() => {
        console.log("Log out successful");
        setCurrentUser({});
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Log out failed");
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <button className={styles.logoutBtn} onClick={handleLogOut}>
          Logout
        </button>
      )}
    </>
  );
}
