import { Separator } from "@/components/ui/separator.tsx";

import { cn } from "@/lib/utils.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

export interface ListProps {
  users: UserDBProps[];
  onClick: (people: UserDBProps) => void;
}

interface MentionedListProps extends ListProps {
  focusIndex: number;
}

const AutoCompleteMentionList = ({ users, onClick, focusIndex }: MentionedListProps) => {
  if (!users.length) return "";

  const handleClick = (user: UserDBProps) => () => onClick(user);

  return (
    <ul className="bg-layer-1 absolute bottom-12 left-0 right-0 z-10 mt-2 overflow-hidden scroll-auto border p-2">
      {users?.map((user, index) => (
        <li key={user.slackId}>
          <p
            onClick={handleClick(user)}
            className={cn(
              "hover:bg-layer-3 text-content-4 cursor-pointer py-2 hover:font-bold",
              focusIndex === index ? "bg-layer-3 font-bold" : "",
            )}
          >
            {user.name}
          </p>
          {index !== users.length - 1 && <Separator />}
        </li>
      ))}
    </ul>
  );
};

export default AutoCompleteMentionList;
