import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => (
  <div className="bg flex h-screen w-screen flex-row">
    <Sidebar />
    <div className="bg-layer-1 w-full">
      <Outlet />
    </div>
  </div>
);

export default Layout;
