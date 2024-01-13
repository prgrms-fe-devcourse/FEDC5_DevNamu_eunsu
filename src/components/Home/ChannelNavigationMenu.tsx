import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const getNavLinkClass = (isActive: boolean) => {
  return cn(
    `text-content-1 border border-layer-4 border-b-0 bg-layer-3 rounded-t-md hover:bg-layer-3 text-center text-lg font-medium px-4 py-3`,
    isActive && "bg-layer-1 text-content-4",
  );
};

const ChannelNavigationMenu = () => {
  return (
    <nav className="border-layer-4 border-b-2 py-2">
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
