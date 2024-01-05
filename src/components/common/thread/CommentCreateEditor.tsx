import EditorTextArea from "../Editor/EditorTextArea";

import useUploadComment from "@/hooks/api/useUploadComment";

interface Props {
  disableMention?: boolean;
  postId: string;
}

const CommentCreateEditor = ({ disableMention, postId }: Props) => {
  // 변하는 prop은 여기서 직접 제공
  const { uploadComment } = useUploadComment(postId);

  return <EditorTextArea disableMention={disableMention} onSubmit={uploadComment} />;
};

export default CommentCreateEditor;
