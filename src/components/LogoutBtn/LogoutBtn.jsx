import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

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
      {isLoading ? <Loader /> : <button onClick={handleLogOut}>Logout</button>}
    </>
  );
}
