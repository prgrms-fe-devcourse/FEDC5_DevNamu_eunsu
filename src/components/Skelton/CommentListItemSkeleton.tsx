import { Skeleton } from "../ui/skeleton";

interface Props {
  commentsCount: number;
}

const CommentItemSkeleton = () => {
  return (
    <div className="flex">
      <Skeleton className="mr-3 flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
      <div className="min-w-0 flex-grow">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-[120px] bg-gray-200" />
          <Skeleton className="h-6 w-[120px] bg-gray-200" />
        </div>
        <Skeleton className="mb-4 mt-2 h-8 w-[390px] bg-gray-200" />
      </div>
    </div>
  );
};

const CommentListItemSkeleton = ({ commentsCount }: Props) => {
  const skeletons = Array.from({ length: commentsCount }, (_, index) => (
    <CommentItemSkeleton key={index} />
  ));
  return <li className="relative mb-5 px-2.5 py-2.5 ">{skeletons}</li>;
};

export default CommentListItemSkeleton;
