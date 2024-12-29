import { Suspense } from "react";

import Router from "./Router";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Router />
      </Suspense>
    </AuthProvider>
  );
}
