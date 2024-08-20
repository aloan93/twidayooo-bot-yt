import { googleLogout } from "@react-oauth/google";

export default function LogoutBtn() {
  return <button onClick={googleLogout}>Logout</button>;
}
