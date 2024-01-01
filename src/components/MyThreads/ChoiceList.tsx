import { Badge } from "@/components/ui/badge.tsx";

import { ListProps } from "@/components/MyThreads/MentionList.tsx";

const ChoiceList = ({ list, onClick }: ListProps) => {
  return (
    <div className="mb-2 flex gap-2">
      {list.map(({ name, userId }) => {
        return (
          <Badge key={userId} onClick={() => onClick({ name, userId })} className="cursor-pointer">
            {name}
          </Badge>
        );
      })}
    </div>
  );
};
export default ChoiceList;
