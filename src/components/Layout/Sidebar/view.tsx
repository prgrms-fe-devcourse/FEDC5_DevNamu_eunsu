import { Link } from "react-router-dom";
import { LogIn, MoonIcon, SunIcon, UserRoundCog, LogOut, HelpCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useOverlay } from "@toss/use-overlay";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

import LoginModal from "../Modals/Login";
import ProfileModal from "../Modals/Profile";
import InformationModal from "../Modals/Information";

import { SIDEBAR_ICONS } from "./config";
import { ThemeConfigDropdown } from "./ThemeConfigDropdown";
import { ButtonWrappingCSS, IconCSS, IconDescriptionCSS, IconWrappingCSS } from "./styles";
import SidebarButton from "./SidebarButton";

import { cn } from "@/lib/utils";
import usePostLogout from "@/apis/auth/usePostLogout";
import useToast from "@/hooks/common/useToast";
import { AUTH_ERROR_MESSAGE, AUTH_SUCCESS_MESSAGE } from "@/constants/toastMessage";

interface Props {
  pathname: string;
  user: {
    nickname: string;
    profileImgUrl: string;
  };
  hasNewNotification?: boolean;
  theme: "light" | "dark" | "system-light" | "system-dark";
}

const themeIconConfig = {
  light: SunIcon,
  "system-light": SunIcon,
  dark: MoonIcon,
  "system-dark": MoonIcon,
};

export const SidebarView = ({ pathname, user, hasNewNotification, theme }: Props) => {
  const { nickname, profileImgUrl } = user;
  const shortenedNickname = nickname
    .split(" ")
    .map((str) => str.at(0))
    .join("");

  const CurrentThemeIcon = themeIconConfig[theme];

  const { mutateAsync: logout } = usePostLogout();
  const { showPromiseToast } = useToast();
  const { open } = useOverlay();

  const isLoggedIn = !!getLocalStorage("token", "");
  const alreadyLoggedIn = getLocalStorage("isLogin", false);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (!alreadyLoggedIn) setLocalStorage("isLogin", true);
    else toast.success("자동 로그인 되었습니다 :D");
  }, [isLoggedIn, alreadyLoggedIn]);

  const handleLoginModalOpen = () => {
    open(({ isOpen, close }) => {
      return <LoginModal open={isOpen} close={close} />;
    });
  };

  const handleProfileModalOpen = () => {
    open(({ isOpen, close }) => {
      gtag("event", "ui사용_사용자_정보_변경_모달_띄우기");
      return <ProfileModal open={isOpen} close={close} />;
    });
  };

  const handleInfoModalOpen = () => {
    open(({ isOpen, close }) => {
      gtag("event", "ui사용_이용_방법_모달_띄우기");
      return <InformationModal open={isOpen} close={close} />;
    });
  };

  const handleLogout = () => {
    showPromiseToast({
      promise: logout(),
      messages: {
        success: AUTH_SUCCESS_MESSAGE.LOGOUT,
        error: AUTH_ERROR_MESSAGE.LOGOUT,
      },
    });
    gtag("event", "retention_로그아웃");
  };

  const handleThemeChange = () => {
    gtag("event", "ui사용_테마_변경_옵션_띄우기");
  };

  /*
    Link Button과 DarkMode Dropdown 버튼이 공유하는 CSS가 많아서 styles로 상수화함.
    (Link를 쓰지 말고 navigate를 써도 될 듯)

    안타깝게도 Link vs div 차이와 일부 relative, hover CSS 차이가 있어서 그대로 재활용은 어려움.

    TODO: [2023-12-29] 더 좋은 Tailwind 방식의 재활용 방법 찾기
  */
  return (
    <>
      <div className="flex w-20 flex-col items-center justify-between gap-8">
        <div className="mt-4 flex cursor-pointer select-none flex-col items-center gap-2">
          {isLoggedIn ? (
            <Avatar className="flex items-center">
              <AvatarImage src={profileImgUrl} alt={nickname} />
              <AvatarFallback className="bg-layer-3 text-content-6 dark:bg-blue-300">
                {shortenedNickname}
              </AvatarFallback>
            </Avatar>
          ) : (
            <SidebarButton label="로그인" Icon={LogIn} onClick={handleLoginModalOpen} />
          )}
          {SIDEBAR_ICONS.filter(
            ({ requireAuth }) => !requireAuth || (requireAuth && isLoggedIn),
          ).map(({ url, name, icon: Icon }) => {
            const isSelectedPage = pathname === url;
            return (
              <Link key={url} to={url} className={ButtonWrappingCSS}>
                <div
                  className={cn(
                    "relative",
                    IconWrappingCSS,
                    isSelectedPage && "bg-[rgba(124,40,82,0.25)] text-2xl dark:bg-white/10",
                  )}
                >
                  <Icon className={IconCSS} />
                  {/* TODO: [2023-12-29] 지금처럼 url로 분기하지 않고 showBubble로 추상화하기 */}
                  {url === "/my-notifications" && hasNewNotification && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-2xl bg-[rgba(124,40,82,0.75)] text-xs text-foreground dark:bg-white/20"></div>
                  )}
                </div>
                <span className={IconDescriptionCSS}>{name}</span>
              </Link>
            );
          })}
          <ThemeConfigDropdown>
            <div className={ButtonWrappingCSS} onClick={handleThemeChange}>
              <div className={IconWrappingCSS}>
                <CurrentThemeIcon className={IconCSS} />
              </div>
              <span className={IconDescriptionCSS}>테마 설정</span>
            </div>
          </ThemeConfigDropdown>
          <SidebarButton label="이용 방법" Icon={HelpCircle} onClick={handleInfoModalOpen} />
        </div>
        {isLoggedIn && (
          <div className="flex flex-col items-center">
            <SidebarButton
              label="내 정보 수정"
              Icon={UserRoundCog}
              onClick={handleProfileModalOpen}
            />
            <SidebarButton
              label="로그아웃"
              AdditionalCSS="mb-6"
              Icon={LogOut}
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </>
  );
};
