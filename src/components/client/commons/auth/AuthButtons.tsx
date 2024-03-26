"use client";

import { signIn, signOut } from "next-auth/react";

type Provider = {
  provider: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};

export function SignInButton({ provider }: Provider) {
  return (
    <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
      Sign In with {provider.name}
    </button>
  );
}

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
  );
}
