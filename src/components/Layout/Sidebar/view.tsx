import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { LINKS } from "./config";

import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
  user: {
    nickname: string;
    profileImgUrl: string;
  };
  notifications: {
    text: string;
  }[];
}

export const SidebarView = ({ pathname, user, notifications }: Props) => {
  const { nickname, profileImgUrl } = user;
  const numberOfNotifications = notifications.length;
  const shortenedNickname = nickname
    .split(" ")
    .map((str) => str.at(0))
    .join("");

  return (
    <div className="flex flex-col items-center w-20 gap-8">
      <div className="flex flex-col items-center gap-2 mt-4 cursor-pointer select-none">
        <Avatar className="flex items-center">
          <AvatarImage src={profileImgUrl} alt={nickname} />
          <AvatarFallback>{shortenedNickname}</AvatarFallback>
        </Avatar>
        {LINKS.map(({ url, name, icon: Icon }) => {
          const isSelectedPage = pathname === url;

          return (
            <Link
              key={url}
              to={url}
              className="flex flex-col items-center gap-1 py-2 text-xl hover:text-2xl"
            >
              <div
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-[rgba(124,40,82,0.25)]",
                  isSelectedPage && "bg-[rgba(124,40,82,0.25)] text-2xl",
                )}
              >
                <Icon className="h-[1em] w-[1em] text-[rgb(124,40,82)] transition-[width,height]" />
                {url === "/my-notifications" && numberOfNotifications > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-2xl bg-[rgba(124,40,82,0.75)] text-xs text-white">
                    {numberOfNotifications}
                  </div>
                )}
              </div>
              <span className="text-xs font-bold tracking-tighter text-[rgb(124,40,82)]">
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
