import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Thread } from "@/types/thread";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  return (
    <ul className="max-h-500pxr min-h-500pxr overflow-auto rounded-sm border border-t-0">
      {threads.map((thread) => (
        <li key={thread._id} className="px-10pxr py-5pxr">
          <div className="flex items-center">
            <Avatar className="mr-3">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-grow">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">익명의 프롱이</span>
                <span className="text-gray-400">오후 12:33</span>
              </div>
              <div className="overflow-hidden truncate text-ellipsis pr-50pxr text-gray-500">
                {thread.title}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThreadList;
