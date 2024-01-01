import { Separator } from "@/components/ui/separator.tsx";

import { cn } from "@/lib/utils.ts";
import { MyType } from "@/lib/trie.ts";

export interface ListProps {
  list: MyType[];
  onClick: (people: MyType) => void;
}

interface MentionListProps extends ListProps {
  focusIdx: number;
}

const MentionList = ({ list, onClick, focusIdx }: MentionListProps) => {
  return (
    <div className="mt-2 overflow-hidden scroll-auto border p-2">
      {list.map(({ name, userId }, idx) => {
        return (
          <div
            key={userId}
            className={cn("hover:bg-gray-100", focusIdx === idx ? "bg-gray-100" : "")}
          >
            <p
              onClick={() => onClick({ name, userId })}
              className={cn(
                "cursor-pointer py-2 hover:font-bold",
                focusIdx === idx ? "font-bold" : "",
              )}
            >
              {name}
            </p>
            {idx !== list.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
};

export default MentionList;
