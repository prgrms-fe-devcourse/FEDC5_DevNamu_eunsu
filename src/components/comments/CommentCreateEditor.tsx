import EditorTextArea from "../common/Editor/textArea";

import useUploadComment from "@/hooks/api/useUploadComment";

interface Props {
  disableMention?: boolean;
  postId: string;
}

const CommentCreateEditor = ({ disableMention, postId }: Props) => {
  const uploadComment = useUploadComment(postId);

  return <EditorTextArea disableMention={disableMention} onSubmit={uploadComment} />;
};

export default CommentCreateEditor;
