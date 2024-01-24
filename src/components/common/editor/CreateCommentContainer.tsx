import EditorTextAreaPresentational from "@/components/common/editor/EditorTextAreaPresentational.tsx";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import useUploadComment from "@/hooks/api/useUploadComment.ts";

interface Props {
  isMention: boolean;
  nickname: string;
  postId: string;
  isLogin: boolean;
  channelId: string;
  channelName: string;
  postAuthorId: string;
}
const CreateCommentContainer = (createCommentProps: Props) => {
  const { uploadComment } = useUploadComment({
    nickname: createCommentProps.nickname,
    postId: createCommentProps.postId,
    channelId: createCommentProps.channelId,
    channelName: createCommentProps.channelName,
    postAuthorId: createCommentProps.postAuthorId,
  });
  const handleSubmit = (params: FormSubmitProps) => {
    uploadComment(params);
  };

  return <EditorTextAreaPresentational {...createCommentProps} onSubmit={handleSubmit} />;
};

export default CreateCommentContainer;
