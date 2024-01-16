import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "@/components/common/mention/AutoCompleteMentionList";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

const UserBadgeList = ({ users, onClick }: ListProps) => {
  const handleClick = (people: UserDBProps) => () => onClick(people);

  return (
    <div className="mb-2 flex flex-wrap gap-2 ">
      {users.map((people) => (
        <Badge
          key={people.slackId}
          onClick={handleClick(people)}
          className="bg-content-5 cursor-pointer"
        >
          {people.name}
        </Badge>
      ))}
    </div>
  );
};
export default UserBadgeList;
