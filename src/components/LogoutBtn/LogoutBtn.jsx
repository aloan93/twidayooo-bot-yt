import useAuth from "../../hooks/useAuth";

export default function LogoutBtn() {
  const { logOut, setCurrentUser } = useAuth();

  function handleLogOut(e) {
    e.preventDefault();
    logOut()
      .then(() => {
        console.log("Log out successful");
        setCurrentUser({});
      })
      .catch((error) => {
        console.log("Log out failed");
        console.log(error);
      });
  }

  return <button onClick={handleLogOut}>Logout</button>;
}
