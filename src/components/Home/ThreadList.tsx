import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Thread } from "@/types/thread";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  return (
    <ul>
      {threads.map((thread) => (
        <li key={thread._id} className="border">
          <div className="flex items-center">
            <Avatar className="mr-5pxr">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="max-w-xl">
              <div>
                <span className="text-lg font-semibold">익명의 프롱이</span>
                <span>12:33</span>
              </div>
              <span className="block overflow-hidden truncate text-ellipsis text-gray-500">
                {thread.title}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThreadList;
