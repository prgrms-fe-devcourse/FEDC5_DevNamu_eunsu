import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "@/components/common/mention/AutoCompleteMentionList";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

const UserBadgeList = ({ users, onClick }: ListProps) => {
  const handleClick = (user: UserDBProps) => () => onClick(user);

  return (
    <div className="mb-2 flex flex-wrap gap-2 ">
      {users.map((user) => (
        <Badge
          key={user.slackId}
          onClick={handleClick(user)}
          className="bg-content-5 cursor-pointer"
        >
          {user.name}
        </Badge>
      ))}
    </div>
  );
};
export default UserBadgeList;
