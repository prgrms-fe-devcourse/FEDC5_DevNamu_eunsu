import { Skeleton } from "../ui/skeleton";

const ThreadListItemSkeleton = () => {
  return (
    <li className="relative mb-5 px-2.5 py-2.5 ">
      <div className="flex">
        <Skeleton className="mr-3 flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-layer-4" />
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[120px] bg-layer-4" />
            <Skeleton className="h-6 w-[120px] bg-layer-4" />
          </div>
          <Skeleton className="mb-4 mt-2 h-8 w-[750px] bg-layer-4" />
          <div className="flex">
            <Skeleton className="mr-2 h-5 w-[40px] bg-layer-4" />
            <Skeleton className="h-5 w-[120px] bg-layer-4" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ThreadListItemSkeleton;
