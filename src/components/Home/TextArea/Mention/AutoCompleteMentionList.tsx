import { Separator } from "@/components/ui/separator.tsx";

import { cn } from "@/lib/utils.ts";
import { MyType } from "@/constants/dummyData.ts";

export interface ListProps {
  users: MyType[];
  onClick: (people: MyType) => void;
}

interface MentionListProps extends ListProps {
  focusIndex: number;
}

const AutoCompleteMentionList = ({ users, onClick, focusIndex }: MentionListProps) => {
  if (!users.length) return "";
  return (
    <div className="mt-2 overflow-hidden scroll-auto border p-2">
      {users.map(({ name, userId }, idx) => {
        return (
          <ul
            key={userId}
            className={cn("hover:bg-gray-100", focusIndex === idx ? "bg-gray-100" : "")}
          >
            <li
              onClick={() => onClick({ name, userId })}
              className={cn(
                "cursor-pointer py-2 hover:font-bold",
                focusIndex === idx ? "font-bold" : "",
              )}
            >
              {name}
            </li>
            {idx !== users.length - 1 && <Separator />}
          </ul>
        );
      })}
    </div>
  );
};

export default AutoCompleteMentionList;
