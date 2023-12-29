import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import LoginModal from "../Modals/login";
import RegisterModal from "../Modals/register";

import { LINKS } from "./config";
import { ThemeConfigDropdown } from "./ThemeConfigDropdown";
import { ButtonWrappingCSS, IconCSS, IconDescriptionCSS, IconWrappingCSS } from "./styles";

import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
  user: {
    nickname: string;
    profileImgUrl: string;
  };
  numberOfNotifications: number;
  theme: "light" | "dark" | "system-light" | "system-dark";
}

const themeIconConfig = {
  light: SunIcon,
  "system-light": SunIcon,
  dark: MoonIcon,
  "system-dark": MoonIcon,
};

export const SidebarView = ({ pathname, user, numberOfNotifications, theme }: Props) => {
  const { nickname, profileImgUrl } = user;
  const shortenedNickname = nickname
    .split(" ")
    .map((str) => str.at(0))
    .join("");

  const CurrentThemeIcon = themeIconConfig[theme];

  /*
    Link Button과 DarkMode Dropdown 버튼이 공유하는 CSS가 많아서 styles로 상수화함.
    (Link를 쓰지 말고 navigate를 써도 될 듯)

    안타깝게도 Link vs div 차이와 일부 relative, hover CSS 차이가 있어서 그대로 재활용은 어려움.

    TODO: [2023-12-29] 더 좋은 Tailwind 방식의 재활용 방법 찾기
  */

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <LoginModal
        open={loginModalOpen}
        toggleOpen={setLoginModalOpen}
        openRegisterModal={setRegisterModalOpen}
      />
      <RegisterModal
        open={registerModalOpen}
        toggleOpen={setRegisterModalOpen}
        openLoginModal={setLoginModalOpen}
      />
      <div className="flex flex-col items-center w-20 gap-8">
        <div className="flex flex-col items-center gap-2 mt-4 cursor-pointer select-none">
          <Avatar onClick={() => setLoginModalOpen(true)} className="flex items-center">
            <AvatarImage src={profileImgUrl} alt={nickname} />
            <AvatarFallback>{shortenedNickname}</AvatarFallback>
          </Avatar>
          {LINKS.map(({ url, name, icon: Icon }) => {
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
                  {url === "/my-notifications" && numberOfNotifications > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-2xl bg-[rgba(124,40,82,0.75)] text-xs text-white">
                      {numberOfNotifications}
                    </div>
                  )}
                </div>
                <span className={IconDescriptionCSS}>{name}</span>
              </Link>
            );
          })}
          <ThemeConfigDropdown>
            <div className={ButtonWrappingCSS}>
              <div className={IconWrappingCSS}>
                <CurrentThemeIcon className={IconCSS} />
              </div>
              <span className={IconDescriptionCSS}>테마 설정</span>
            </div>
          </ThemeConfigDropdown>
        </div>
      </div>
    </>
  );
};
