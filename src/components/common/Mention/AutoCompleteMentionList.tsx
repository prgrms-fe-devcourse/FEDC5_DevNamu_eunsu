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
    <ul className="absolute bottom-12 left-0 right-0 z-10 mt-2 overflow-hidden scroll-auto border bg-white p-2">
      {users.map(({ name, userId }, index) => {
        return (
          <li key={userId}>
            <p
              onClick={() => onClick({ name, userId })}
              className={cn(
                "cursor-pointer py-2 hover:bg-gray-100 hover:font-bold",
                focusIndex === index ? "bg-gray-100 font-bold" : "",
              )}
            >
              {name}
            </p>
            {index !== users.length - 1 && <Separator />}
          </li>
        );
      })}
    </ul>
  );
};

export default AutoCompleteMentionList;
