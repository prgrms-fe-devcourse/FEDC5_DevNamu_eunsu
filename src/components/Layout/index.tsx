import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-row w-screen h-screen bg">
      <Sidebar />
      <div className="w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
