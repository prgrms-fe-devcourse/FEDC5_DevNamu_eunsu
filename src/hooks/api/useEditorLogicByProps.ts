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
}

interface CommentProps {
  channelName: string;
  postId: string;
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

interface Props {
  editorProps: EditorProps;
  nickname: string | undefined;
  mentionList?: UserDBProps[];
}

interface UploadHooksProps {
  (params: { anonymous: boolean; content: string }): void;
}

const useEditorLogicByProps = ({ editorProps, nickname, mentionList = [] }: Props) => {
  const [upload, setUpload] = useState<UploadHooksProps>(() => () => {});

  const { uploadThread } = useCreateThread({
    nickname,
    channelId: isCreateThreadProps(editorProps) ? editorProps.channelId : "",
    mentionList,
  });
  const { changeThread } = useChangeThread({
    nickname,
    postId: isPatchThreadProps(editorProps) ? editorProps.postId : "",
    mentionList,
  });
  const { uploadComment } = useUploadComment({
    nickname,
    postId: isCommentProps(editorProps) ? editorProps.postId : "",
    channelName: isCommentProps(editorProps) ? editorProps.channelName : "",
    mentionList,
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
  }, [editorProps, mentionList]);

  return { upload };
};

export default useEditorLogicByProps;
