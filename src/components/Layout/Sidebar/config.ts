import { BellRingIcon, HomeIcon, PenSquareIcon, SettingsIcon } from "lucide-react";

export const LINKS = [
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
    icon: SettingsIcon,
    name: "시스템",
    requireAuth: true,
  },
];
