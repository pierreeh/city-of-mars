import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { auth } from "@/lib/db";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Must be a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    setErrors(null);

    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(auth, email, password);
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

  useEffect(() => {
    if (!!user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <section>
      <h1 className="text-2xl">Register</h1>
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
                <FormMessage />
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
                <FormDescription>
                  Password must be at least 6 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            Register
          </Button>
        </form>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
