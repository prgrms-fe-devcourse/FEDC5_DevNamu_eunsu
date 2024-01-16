import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface Props {
  count: number;
}
const CustomMyThreadSkeleton = () => {
  return (
    <li className="relative mb-5 px-2.5 py-2.5 ">
      <div className="flex">
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[120px] bg-layer-4" />
            <Skeleton className="h-6 w-[120px] bg-layer-4" />
          </div>
          <Skeleton className="mb-4 mt-2 h-6 w-[750px] bg-layer-4" />
          <Separator />
        </div>
      </div>
    </li>
  );
};

const MyThreadSkeleton = ({ count }: Props) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <CustomMyThreadSkeleton key={index} />
  ));
  return <ul className="flex h-[calc(100vh-250px)] flex-col  pt-40pxr">{skeletons}</ul>;
};

export default MyThreadSkeleton;
