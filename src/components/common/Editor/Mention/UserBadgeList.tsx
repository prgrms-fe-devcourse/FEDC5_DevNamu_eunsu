import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "./AutoCompleteMentionList";

const UserBadgeList = ({ users, onClick }: ListProps) => {
  if (!users.length) return "";

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {users.map(({ name, userId }) => {
        return (
          <Badge key={userId} onClick={() => onClick({ name, userId })} className="cursor-pointer">
            {name}
          </Badge>
        );
      })}
    </div>
  );
};
export default UserBadgeList;
