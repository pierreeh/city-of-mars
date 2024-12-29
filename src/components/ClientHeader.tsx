import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { auth } from "@/lib/db";

export default function ClientHeader() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);
      navigate("/", { replace: true });
    } catch (e: any) {
      setLoading(false);
      console.error(e);
    }
  }

  return (
    <header className="flex justify-between py-6 px-10">
      <Link to="/">City of Mars</Link>

      <nav>
        <ul className="flex gap-5">
          {!user ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <Button disabled={loading} onClick={logout}>
              Logout
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
}
