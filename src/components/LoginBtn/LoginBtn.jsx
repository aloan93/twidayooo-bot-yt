import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

export default function LoginBtn() {
  const { setCurrentUser, logIn } = useAuth();

  function handleLogIn(e) {
    e.preventDefault();
    logIn()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        setCurrentUser({ token, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log({ errorCode, errorMessage, email, credential });
      });
  }

  return <button onClick={handleLogIn}>Login</button>;
}
