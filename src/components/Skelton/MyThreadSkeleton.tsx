import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const CustomMyThreadSkeleton = () => {
  return (
    <li className="relative mb-5 px-2.5 py-2.5 ">
      <div className="flex">
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-6 w-[120px]" />
          </div>
          <Skeleton className="mb-4 mt-2 h-6 w-[750px]" />
          <Separator />
        </div>
      </div>
    </li>
  );
};

const MyThreadSkeleton = () => {
  return (
    <ul className="flex h-[calc(100vh-250px)] flex-col  pt-40pxr">
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
      <CustomMyThreadSkeleton />
    </ul>
  );
};

export default MyThreadSkeleton;
