import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const getNavLinkClass = (isActive: boolean) => {
  cn(
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
            to="/channel/compliment"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            칭찬 게시판
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/channel/cheering"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            응원 게시판
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/channel/incompetent"
            className={({ isActive }) => `${getNavLinkClass(isActive)}`}
          >
            무능 게시판
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ChannelNavigationMenu;
