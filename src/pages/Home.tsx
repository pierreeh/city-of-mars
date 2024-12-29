import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { loading, user } = useContext(AuthContext);
  console.log(loading, user, "home");

  return <div>Home</div>;
}
