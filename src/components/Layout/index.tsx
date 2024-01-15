import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import InformationModal from "./Modals/Information";

const Layout = () => {
  // TODO: [2023-12-29] 테마 설정에 따라 배경색 변경하기
  return (
    <div className="bg flex h-screen w-screen flex-row">
      <Sidebar />
      {/* // TODO: 머지 전 삭제 */}
      <InformationModal open={true} toggleOpen={() => {}} />
      <div className="bg-layer-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
