import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User } from "lucide-react";

import { auth } from "@/lib/db";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </DropdownMenuTrigger>
        {!user ? (
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span onClick={() => navigate("/login")}>Login</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span onClick={() => navigate("/register")}>Register</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span onClick={() => navigate("/profile")}>Profile</span>
            </DropdownMenuItem>
            {!loading && (
              <DropdownMenuItem>
                <span onClick={logout}>Logout</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </header>
  );
}
