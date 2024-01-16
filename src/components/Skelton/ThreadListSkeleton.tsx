import ThreadListItemSkeleton from "./ThreadListItemSkelton";

interface Props {
  count: number;
}

const ThreadSkeleton = ({ count }: Props) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <ThreadListItemSkeleton key={index} />
  ));

  return (
    <ul className="pt-40px flex h-[calc(100vh-250px)] flex-col overflow-hidden">{skeletons}</ul>
  );
};

export default ThreadSkeleton;
