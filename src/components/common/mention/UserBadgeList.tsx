import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "@/components/common/mention/AutoCompleteMentionList";

const UserBadgeList = ({ users, onClick }: ListProps) => {
  if (!users.length) return "";

  return (
    <div className="mb-2 flex flex-wrap gap-2">
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
