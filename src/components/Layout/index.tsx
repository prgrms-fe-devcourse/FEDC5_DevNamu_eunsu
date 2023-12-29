import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  // TODO: [2023-12-29] 테마 설정에 따라 배경색 변경하기
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
