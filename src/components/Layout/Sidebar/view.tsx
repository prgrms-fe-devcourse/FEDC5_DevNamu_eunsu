import { Link } from "react-router-dom";
import { LogIn, MoonIcon, SunIcon, UserRoundCog, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import * as Sentry from "@sentry/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getLocalStorage } from "@/utils/localStorage";

import LoginModal from "../Modals/Login";
import RegisterModal from "../Modals/Register";
import ProfileModal from "../Modals/Profile";

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

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { mutateAsync: logout } = usePostLogout();
  const { showPromiseToast } = useToast();

  const isLoggedIn = !!getLocalStorage("token", "");

  useEffect(() => {
    if (isLoggedIn) toast.success("로그인 되었습니다 :D");
  }, [isLoggedIn]);

  const handleLogout = () => {
    showPromiseToast({
      promise: logout(),
      messages: {
        success: AUTH_SUCCESS_MESSAGE.LOGOUT,
        error: AUTH_ERROR_MESSAGE.LOGOUT,
      },
    });
    Sentry.captureMessage("retention - 로그아웃");
  };

  const handleThemeChange = () => {
    Sentry.captureMessage("ui 사용 - 테마 변경 옵션 띄우기");
  };

  const handlerOpenProfileModal = () => {
    setProfileModalOpen(true);
    Sentry.captureMessage("ui 사용 - 사용자 정보 변경 모달 띄우기");
  };

  const handlerOpenLoginModal = () => {
    if (!isLoggedIn) setLoginModalOpen(true);
  };
  /*
    Link Button과 DarkMode Dropdown 버튼이 공유하는 CSS가 많아서 styles로 상수화함.
    (Link를 쓰지 말고 navigate를 써도 될 듯)

    안타깝게도 Link vs div 차이와 일부 relative, hover CSS 차이가 있어서 그대로 재활용은 어려움.

    TODO: [2023-12-29] 더 좋은 Tailwind 방식의 재활용 방법 찾기
  */
  return (
    <>
      {!isLoggedIn && (
        <LoginModal
          open={loginModalOpen}
          toggleOpen={setLoginModalOpen}
          openRegisterModal={setRegisterModalOpen}
        />
      )}
      {!isLoggedIn && (
        <RegisterModal
          open={registerModalOpen}
          toggleOpen={setRegisterModalOpen}
          openLoginModal={setLoginModalOpen}
        />
      )}
      {isLoggedIn && <ProfileModal open={profileModalOpen} toggleOpen={setProfileModalOpen} />}
      <div className="flex w-20 flex-col items-center justify-between gap-8">
        <div className="mt-4 flex cursor-pointer select-none flex-col items-center gap-2">
          {isLoggedIn ? (
            <Avatar className="flex items-center">
              <AvatarImage src={profileImgUrl} alt={nickname} />
              <AvatarFallback>{shortenedNickname}</AvatarFallback>
            </Avatar>
          ) : (
            <SidebarButton label="로그인" Icon={LogIn} onClick={handlerOpenLoginModal} />
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
                    isSelectedPage && "bg-[rgba(124,40,82,0.25)] text-2xl",
                  )}
                >
                  <Icon className={IconCSS} />
                  {/* TODO: [2023-12-29] 지금처럼 url로 분기하지 않고 showBubble로 추상화하기 */}
                  {url === "/my-notifications" && hasNewNotification && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-2xl bg-[rgba(124,40,82,0.75)] text-xs text-white"></div>
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
        </div>

        {isLoggedIn && (
          <div className="flex flex-col items-center">
            <SidebarButton
              label="내 정보 수정"
              Icon={UserRoundCog}
              onClick={handlerOpenProfileModal}
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
