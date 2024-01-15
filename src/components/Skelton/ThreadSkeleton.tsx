import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count: number;
}
const CustomThreadSkeleton = () => {
  return (
    <li className="relative mb-5 px-2.5 py-2.5 ">
      <div className="flex">
        <Skeleton className="mr-3 flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[120px] bg-gray-200" />
            <Skeleton className="h-6 w-[120px] bg-gray-200" />
          </div>
          <Skeleton className="mb-4 mt-2 h-8 w-[750px] bg-gray-200" />
          <div className="flex">
            <Skeleton className="mr-2 h-5 w-[40px] bg-gray-200" />
            <Skeleton className="h-5 w-[120px] bg-gray-200" />
          </div>
        </div>
      </div>
    </li>
  );
};

const ThreadSkeleton = ({ count }: Props) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <CustomThreadSkeleton key={index} />
  ));

  return (
    <ul className="pt-40px flex h-[calc(100vh-250px)] flex-col overflow-hidden">{skeletons}</ul>
  );
};

export default ThreadSkeleton;
