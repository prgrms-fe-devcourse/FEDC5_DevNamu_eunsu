import { BellRingIcon, HomeIcon, PenSquareIcon, UserRoundCog } from "lucide-react";

export const SIDEBAR_ICONS = [
  {
    url: "/",
    icon: HomeIcon,
    name: "홈",
    requireAuth: false,
  },
  {
    url: "/my-notifications",
    icon: BellRingIcon,
    name: "내 알림",
    requireAuth: true,
  },
  {
    url: "/my-threads",
    icon: PenSquareIcon,
    name: "내가 쓴 글",
    requireAuth: true,
  },
  {
    url: "",
    icon: UserRoundCog,
    name: "내 정보 변경",
    requireAuth: true,
  },
];
