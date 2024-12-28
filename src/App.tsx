import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./Router";

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
