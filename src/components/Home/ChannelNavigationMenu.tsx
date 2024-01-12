import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const getNavLinkClass = (isActive: boolean) => {
  return cn(
    `text-gray-600 rounded-t-md hover:bg-gray-100 hover:text-gray-800 text-center text-lg font-medium px-4 py-3 border border-b-0`,
    isActive ? "bg-gray-100" : "",
  );
};

const ChannelNavigationMenu = () => {
  return (
    <nav className="border-b-2 border-gray-500 py-2">
      <ul className="flex">
        <li>
          <NavLink
            to={location.pathname === "/" ? "/" : "/channels/compliment"}
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            칭찬 게시판
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/channels/cheering"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            응원 게시판
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/channels/incompetent"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            무능 게시판
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/channels/improvements"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            개선 사항 게시판
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ChannelNavigationMenu;
