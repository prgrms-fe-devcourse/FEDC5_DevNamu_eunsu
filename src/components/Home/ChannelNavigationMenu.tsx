import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const getNavLinkClass = (isActive: boolean) => {
  return cn(
    `text-gray-600 rounded-t-md hover:bg-gray-100 hover:text-gray-800 text-center text-lg font-medium px-4 py-3 border border-b-0`,
    isActive ? "bg-gray-100" : "",
  );
};

const ChannelNavigationMenu = () => {
  const channels = [
    { path: "/", name: "칭찬 게시판" },
    { path: "/channels/cheering", name: "응원 게시판" },
    { path: "/channels/incompetent", name: "무능 게시판" },
    { path: "/channels/chat", name: "잡담 게시판" },
    { path: "/channels/improvements", name: "개선 사항 게시판" },
  ];

  return (
    <nav className="border-b-2 border-gray-500 py-2">
      <ul className="flex">
        {channels.map((channel) => (
          <li key={channel.path}>
            <NavLink
              to={channel.path === "/" ? "/" : channel.path}
              className={({ isActive }) => `${getNavLinkClass(isActive)}`}
            >
              {channel.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ChannelNavigationMenu;
