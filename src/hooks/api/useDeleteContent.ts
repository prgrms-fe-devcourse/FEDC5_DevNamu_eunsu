import useDeleteThread from "@/apis/thread/useDeleteThread.ts";
import useDeleteComment from "@/apis/comment/useDeleteComment.ts";

const useDeleteContent = () => {
  const { mutate: deleteThreadMutate } = useDeleteThread();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const deleteContent = ({ postId, commentId }: { postId?: string; commentId?: string }) => {
    if (postId) return deleteThreadMutate(postId);
    if (commentId) return deleteCommentMutate(commentId);
  };

  return { deleteContent };
};

export default useDeleteContent;
