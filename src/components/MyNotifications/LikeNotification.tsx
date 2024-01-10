import { formatDate } from "@/utils/formatDate.ts";

import { Like } from "@/types/thread";

interface Props {
  createdAt: string;
  like: Like;
}

const LikeNotification = ({ createdAt, like }: Props) => {
  const createdDate = formatDate(createdAt);

  return (
    <>
      <div> 좋아요 알림</div>
      <div> createdAt: {createdDate}</div>
      <div> like: {like}</div>
    </>
  );
};

export default LikeNotification;
