import { Separator } from "@/components/ui/separator.tsx";

import { cn } from "@/lib/utils.ts";
import { MyType } from "@/constants/dummyData.ts";

export interface ListProps {
  users: MyType[];
  onClick: (people: MyType) => void;
}

interface MentionListProps extends ListProps {
  focusIdx: number;
}

const MentionList = ({ users, onClick, focusIdx }: MentionListProps) => {
  if (!users.length) return "";
  return (
    <div className="mt-2 overflow-hidden scroll-auto border p-2">
      {users.map(({ name, userId }, idx) => {
        return (
          <div
            key={userId}
            className={cn("hover:bg-gray-100", focusIdx === idx ? "bg-gray-100" : "")}
          >
            <p
              onClick={() => onClick({ name, userId })}
              className={cn(
                "cursor-pointer py-2 hover:font-bold",
                focusIdx === idx ? "font-bold" : "",
              )}
            >
              {name}
            </p>
            {idx !== users.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
};

export default MentionList;
