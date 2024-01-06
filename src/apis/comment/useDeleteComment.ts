import { useMutation } from "@tanstack/react-query";

import { deleteComment } from "@/apis/comment/queryFn.ts";

const useDeleteComment = () => {
  return useMutation({ mutationFn: deleteComment, onError: () => {} });
};

export default useDeleteComment;
