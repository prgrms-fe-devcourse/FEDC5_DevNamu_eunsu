import ThreadDetailItemSkeleton from "./ThreadListItemSkelton";
import CommentListItemSkeleton from "./CommentListItemSkeleton";

interface Props {
  commentsCount: number;
}
const ThreadDetailSkeleton = ({ commentsCount }: Props) => {
  return (
    <div>
      <ThreadDetailItemSkeleton />
      <CommentListItemSkeleton commentsCount={commentsCount} />
    </div>
  );
};

export default ThreadDetailSkeleton;
