import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "@/contexts/AuthContext";
import { auth } from "@/lib/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Login = {
  email: string;
  password: string;
};

export default function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: Login) {
    setLoading(true);
    setErrors(null);

    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        navigate("/", { replace: true });
        return auth.currentUser;
      }

      form.reset();
    } catch (e: any) {
      setErrors(e.message || "Something went wrong.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="text-2xl">Login</h1>
      {errors && (
        <Alert>
          <AlertDescription>{errors}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
