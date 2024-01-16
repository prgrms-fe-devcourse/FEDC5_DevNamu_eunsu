import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "@/components/common/mention/AutoCompleteMentionList";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

const UserBadgeList = ({ users, onClick }: ListProps) => {
  if (!users.length) return "";

  const handleClick = () => (people: UserDBProps) => onClick(people);

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {users.map(({ name, userId }) => {
        return (
          <Badge key={userId} onClick={handleClick} className="bg-content-5 cursor-pointer">
            {name}
          </Badge>
        );
      })}
    </div>
  );
};
export default UserBadgeList;
