import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Loader from "../Loader/Loader";
import styles from "./LoginBtn.module.css";
import Error from "../Error/Error";

export default function LoginBtn() {
  const { setCurrentUser, logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);
    logIn()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        setCurrentUser({ token, user });

        setIsLoading(false);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;

        // const email = error.customData.email;

        // const credential = GoogleAuthProvider.credentialFromError(error);

        // console.log({ errorCode, errorMessage, email, credential });

        setErr(`Failed to Login...\n${error.message}`);

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
          <button className={styles.loginBtn} onClick={handleLogIn}>
            Login with Google
          </button>
        </>
      )}
    </>
  );
}
