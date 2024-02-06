import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import useUploadComment from "@/hooks/api/useUploadComment.ts";
import EditorContextProvider from "@/components/common/editor/presenter/EditorContextProvider.tsx";
import CreateSubmit from "@/components/common/editor/textArea/CreateSubmit.tsx";

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
  const { nickname, postId, channelId, channelName, postAuthorId } = createCommentProps;

  const { uploadComment } = useUploadComment({
    nickname,
    postId,
    channelId,
    channelName,
    postAuthorId,
  });

  const handleSubmit = (params: FormSubmitProps) => {
    uploadComment(params);
  };

  return (
    <EditorContextProvider>
      <EditorContextProvider.Mention />
      <EditorContextProvider.TextArea
        {...createCommentProps}
        onSubmit={handleSubmit}
        placeholder="댓글을 작성해주세요."
        submitArea={(props) => <CreateSubmit {...props} />}
      />
    </EditorContextProvider>
  );
};

export default CreateCommentContainer;
