import ChannelNavigationMenu from "../Home/ChannelNavigationMenu";
import ThreadListItem from "../common/thread/ThreadListItem";

import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

// TODO: main에 merge전 데모 꼭 지우기! (2024.01.03)
const ExToolbar = () => {
  const { threads } = useThreadsByChannel();
  console.log(threads);

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <main className="w-full max-w-4xl px-4">
        <ul className="max-h-500pxr min-h-500pxr overflow-auto rounded-sm border border-t-0 py-10pxr">
          {threads?.map(({ _id, createdAt, title, author }) => (
            <ThreadListItem
              key={_id}
              id={_id}
              createdAt={createdAt}
              title={title}
              author={author}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ExToolbar;
