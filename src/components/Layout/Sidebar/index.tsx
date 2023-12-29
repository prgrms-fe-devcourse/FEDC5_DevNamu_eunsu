import { useLocation } from "react-router-dom";

import { SidebarView } from "./view";

// TODO: [2023-12-29] 사용자 정보를 Custom Hook으로 받아와 출력하기
const user = {
  nickname: "익명의 프롱이",
  profileImgUrl: "",
};

// TODO: [2023-12-29] Notification API를 받아와 출력하기
// Notification 같은 경우는 알림 페이지에서 확인 시 Notification 확인 여부가 갱신되므로 전역 상태로 관리하는 게 좋을 듯
const numberOfNotifications = 1;

// TODO: [2023-12-29] 전역 상태 혹은 반영구 저장소에서 현재 테마 가져와 표시하기 (SunIcon or MoonIcon)
const theme = "light";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <SidebarView
      pathname={pathname}
      user={user}
      numberOfNotifications={numberOfNotifications}
      theme={theme}
    />
  );
};

export default Sidebar;
