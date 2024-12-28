import { Outlet } from "react-router-dom";

import ClientHeader from "./ClientHeader";

export default function Layout() {
  return (
    <>
      <ClientHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
