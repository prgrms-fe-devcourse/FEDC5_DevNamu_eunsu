import { Skeleton } from "@/components/ui/skeleton";

const CustomThreadSkeleton = () => {
  return (
    <li className="relative mb-5 px-2.5 py-2.5 ">
      <div className="flex">
        <Skeleton className="mr-3 flex h-12 w-12 shrink-0 overflow-hidden rounded-full" />
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-6 w-[120px]" />
          </div>
          <Skeleton className="mb-4 mt-2 h-8 w-[750px]" />
          <div className="flex">
            <Skeleton className="mr-2 h-5 w-[40px]" />
            <Skeleton className="h-5 w-[120px]" />
          </div>
        </div>
      </div>
    </li>
  );
};

const ThreadSkeleton = () => {
  return (
    <ul className="flex h-[calc(100vh-250px)] flex-col  pt-40pxr">
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
      <CustomThreadSkeleton />
    </ul>
  );
};

export default ThreadSkeleton;
