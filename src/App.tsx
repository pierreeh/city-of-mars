import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./Router";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
