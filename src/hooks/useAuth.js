import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";

export default function useAuth() {
  return useContext(AuthContext);
}
