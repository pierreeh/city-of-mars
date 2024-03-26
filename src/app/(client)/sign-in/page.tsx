import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";

import { SignInButton } from "@/components/client/commons/auth/AuthButtons";

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <h1>Sign In</h1>
      {providers &&
        Object.values(providers).map((p) => (
          <SignInButton key={p.id} provider={p} />
        ))}
    </section>
  );
}
