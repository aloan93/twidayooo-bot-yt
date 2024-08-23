import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Loader from "../Loader/Loader";
import styles from "./LoginBtn.module.css";

export default function LoginBtn() {
  const { setCurrentUser, logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    logIn()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        setCurrentUser({ token, user });

        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log({ errorCode, errorMessage, email, credential });

        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <button className={styles.loginBtn} onClick={handleLogIn}>
          Login with Google
        </button>
      )}
    </>
  );
}
