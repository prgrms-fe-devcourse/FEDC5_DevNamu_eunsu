import { useEffect, useState } from "react";

import useCreateThread from "@/hooks/api/useCreateThread.ts";
import useChangeThread from "@/hooks/api/useChangeThread.ts";
import useUploadComment from "@/hooks/api/useUploadComment.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface CreateThreadProps {
  channelId: string;
}

interface PatchThreadProps {
  prevContent: string;
  postId: string;
  channelId: string;
}

interface CommentProps {
  channelName: string;
  postId: string;
  postAuthorId: string;
}

export type EditorProps = CreateThreadProps | PatchThreadProps | CommentProps;
const isCreateThreadProps = (props: EditorProps): props is CreateThreadProps => {
  return "channelId" in props;
};

const isPatchThreadProps = (props: EditorProps): props is PatchThreadProps => {
  return "prevContent" in props;
};

const isCommentProps = (props: EditorProps): props is CommentProps => {
  return "channelName" in props;
};

export const getTypeOfEditor = (props: EditorProps) => {
  if (isCreateThreadProps(props)) {
    return "스레드 작성";
  }

  if (isPatchThreadProps(props)) {
    return "스레드 수정";
  }

  return "댓글 작성";
};

interface Props {
  editorProps: EditorProps;
  nickname: string | undefined;
  mentionedList?: UserDBProps[];
}

interface UploadHooksProps {
  (params: { anonymous: boolean; content: string }): void;
}

const useEditorLogicByProps = ({ editorProps, nickname, mentionedList }: Props) => {
  const [upload, setUpload] = useState<UploadHooksProps>(() => () => {});

  const { uploadThread } = useCreateThread({
    nickname,
    channelId: isCreateThreadProps(editorProps) ? editorProps.channelId : "",
    mentionedList,
  });

  const { changeThread } = useChangeThread({
    nickname,
    postId: isPatchThreadProps(editorProps) ? editorProps.postId : "",
    channelId: isPatchThreadProps(editorProps) ? editorProps.channelId : "",
    mentionedList,
  });

  const { uploadComment } = useUploadComment({
    nickname,
    postId: isCommentProps(editorProps) ? editorProps.postId : "",
    channelName: isCommentProps(editorProps) ? editorProps.channelName : "",
    postAuthorId: isCommentProps(editorProps) ? editorProps.postAuthorId : "",
    mentionedList,
  });

  useEffect(() => {
    if (isCreateThreadProps(editorProps)) {
      setUpload(() => uploadThread);
    }
    if (isPatchThreadProps(editorProps)) {
      setUpload(() => changeThread);
    }
    if (isCommentProps(editorProps)) {
      setUpload(() => uploadComment);
    }
  }, [editorProps, mentionedList]);

  return { upload };
};

export default useEditorLogicByProps;
