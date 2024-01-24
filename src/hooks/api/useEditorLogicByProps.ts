import { useEffect, useState } from "react";

import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
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
  channelId: string;
  channelName: string;
  postId: string;
  postAuthorId: string;
}

export type EditorProps = CreateThreadProps | PatchThreadProps | CommentProps;

const isPatchThreadProps = (props: EditorProps): props is PatchThreadProps => {
  return "prevContent" in props;
};

const isCommentProps = (props: EditorProps): props is CommentProps => {
  return "channelName" in props;
};

export const getTypeOfEditor = (props: EditorProps) => {
  if (isCommentProps(props)) {
    return "댓글 작성";
  }

  if (isPatchThreadProps(props)) {
    return "스레드 수정";
  }

  return "스레드 작성";
};

interface Props {
  editorProps: EditorProps;
  nickname: string | undefined;
  mentionedList?: UserDBProps[];
}

interface UploadHooksProps {
  (params: FormSubmitProps): void;
}

const useEditorLogicByProps = ({ editorProps, nickname, mentionedList }: Props) => {
  const [upload, setUpload] = useState<UploadHooksProps>(() => () => {});

  const { uploadThread } = useCreateThread({
    nickname,
    channelId: editorProps.channelId,
  });

  const { changeThread } = useChangeThread({
    nickname,
    postId: isPatchThreadProps(editorProps) ? editorProps.postId : "",
    channelId: editorProps.channelId,
  });

  const { uploadComment } = useUploadComment({
    nickname,
    postId: isCommentProps(editorProps) ? editorProps.postId : "",
    channelName: isCommentProps(editorProps) ? editorProps.channelName : "",
    postAuthorId: isCommentProps(editorProps) ? editorProps.postAuthorId : "",
    channelId: editorProps.channelId,
  });

  useEffect(() => {
    if (isPatchThreadProps(editorProps)) {
      setUpload(() => changeThread);
      return;
    }
    if (isCommentProps(editorProps)) {
      setUpload(() => uploadComment);
      return;
    }

    setUpload(() => uploadThread);
  }, [editorProps, mentionedList]);

  return { upload };
};

export default useEditorLogicByProps;
