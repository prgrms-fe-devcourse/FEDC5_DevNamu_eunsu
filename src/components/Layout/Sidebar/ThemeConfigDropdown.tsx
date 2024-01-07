import { MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SettingModal from "../Modals/Setting";

import { IconCSS, IconDescriptionCSS } from "./styles";
// TODO: [2023-12-29] 전역 상태 혹은 반영구 저장소와 연동해야 하므로 해당 Custom Hook과 연동하기
/**
 * 테마를 설정하는 드롭다운
 *
 * children은 클릭 시 드롭다운을 여는 트리거 영역이 됨.
 */
export const ThemeConfigDropdown = ({ children }: PropsWithChildren) => {
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem className="cursor-pointer text-lg hover:text-2xl">
          <div className="flex items-center gap-2 p-2">
            <SunIcon className={IconCSS} />
            <span className={IconDescriptionCSS}>라이트</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-lg hover:text-2xl">
          <div className="flex items-center gap-2 p-2">
            <MoonIcon className={IconCSS} />
            <span className={IconDescriptionCSS}>다크</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-lg hover:text-2xl">
          <div className="flex items-center gap-2 p-2">
            <SettingsIcon className={IconCSS} />
            <span className={IconDescriptionCSS}>시스템</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <SettingModal open={settingModalOpen} toggleOpen={setSettingModalOpen} />
    </DropdownMenu>
  );
};
