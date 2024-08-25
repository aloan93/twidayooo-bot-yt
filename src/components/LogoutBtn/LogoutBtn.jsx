import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import styles from "./LogoutBtn.module.css";
import Error from "../Error/Error";

export default function LogoutBtn() {
  const { logOut, setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  function handleLogOut(e) {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);
    logOut()
      .then(() => {
        setCurrentUser({});
        setIsLoading(false);
      })
      .catch((error) => {
        setErr(`Failed to Logout...\n${error.message}`);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {err ? <Error err={err} /> : null}
          <button className={styles.logoutBtn} onClick={handleLogOut}>
            Logout
          </button>
        </>
      )}
    </>
  );
}
