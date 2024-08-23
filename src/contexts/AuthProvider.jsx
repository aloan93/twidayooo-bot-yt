import { createContext, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  function logIn() {
    return signInWithPopup(auth, provider);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
