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
    <ul className="mt-2 overflow-hidden scroll-auto border p-2">
      {users.map(({ name, userId }, index) => {
        return (
          <>
            <li
              onClick={() => onClick({ name, userId })}
              className={cn(
                "cursor-pointer py-2 hover:bg-gray-100 hover:font-bold",
                focusIndex === index ? "bg-gray-100 font-bold" : "",
              )}
            >
              {name}
            </li>
            {index !== users.length - 1 && <Separator />}
          </>
        );
      })}
    </ul>
  );
};

export default AutoCompleteMentionList;
