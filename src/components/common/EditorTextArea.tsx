import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import * as Sentry from "@sentry/react";
import { useOverlay } from "@toss/use-overlay";

import { Textarea } from "@/components/ui/textarea.tsx";

import LoginModal from "../Layout/Modals/Login";
import ProfileModal from "../Layout/Modals/Profile";

import { cn } from "@/lib/utils";
import MentionInput from "@/components/common/mention/MentionInput.tsx";
import { ANONYMOUS_NICKNAME } from "@/constants/commonConstants.ts";
import useEditorLogicByProps, {
  EditorProps,
  getTypeOfEditor,
} from "@/hooks/api/useEditorLogicByProps.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";
import useToast from "@/hooks/common/useToast";

export interface FormValues {
  anonymous: boolean;
  content: string;
}

interface Props {
  isMention: boolean;
  nickname: string;
  editorProps: EditorProps;
  onEditClose?: () => void;
  authorNickname?: string;
  channelId?: string;
}

const EditorTextArea = ({
  isMention,
  nickname,
  editorProps,
  onEditClose,
  authorNickname,
}: Props) => {
  // TODO: [24/1/10] user는 EditerTextArea를 사용하는 쪽에서 보내주는게 맞다고 생각하지만 빠른 배포를 위해 여기서 불러쓸게요
  const { user, isPending } = useGetUserInfo();
  const { showToast } = useToast();
  const { open } = useOverlay();

  const [mentionedList, setMentionedList] = useState<Array<UserDBProps>>([]);

  const { upload } = useEditorLogicByProps({
    editorProps,
    nickname: user?.nickname || nickname,
    mentionedList: mentionedList.length ? mentionedList : undefined,
  });

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      anonymous: authorNickname ? authorNickname === ANONYMOUS_NICKNAME : true,
      content: "prevContent" in editorProps ? editorProps.prevContent : "",
    },
  });

  const handleUpload = (formValues: FormValues) => {
    if (!formValues.content.trim()) return;

    if (!user) {
      showToast({
        message: "로그인 한 유저만 글 쓰기가 가능합니다.",
        actionLabel: "로그인",
        onActionClick: () => {
          Sentry.captureMessage("Conversion: 익명 사용자가 로그인 요청을 수락", "info");
          open(({ isOpen, close }) => {
            return <LoginModal open={isOpen} close={close} />;
          });
        },
      });
      return;
    }
    upload(formValues);
    setMentionedList([]);
    setValue("content", "");
    onEditClose?.();
    Sentry.captureMessage(`ui 사용 - 에디터 쓰기 ${getTypeOfEditor(editorProps)}`, "info");
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.nativeEvent.isComposing) return;
    if (event.shiftKey && event.key === "Enter") return;

    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleUpload)();
    }
  };

  const handleClickCheckBox = (e: FormEvent<HTMLInputElement>) => {
    // TODO: [24/1/11] nickname은 props로 받아오는게 맞다고 생각합니다. 하지만 여러곳에서 수정이 필요해지니 현재 에디터에 user를 가지고 있어서 임시방편으로 수정하겠습니다.
    if (!e.currentTarget.checked && user?.nickname === ANONYMOUS_NICKNAME) {
      Sentry.captureMessage("ui 사용 - 익명 여부 토글", "info");
      setValue("anonymous", true);
      open(({ isOpen, close }) => {
        Sentry.captureMessage("ui 사용 - 사용자 정보 변경 모달 띄우기", "info");
        return <ProfileModal open={isOpen} close={close} />;
      });
      return;
    }
  };

  if (isPending) return <div>로딩 중... </div>;

  return (
    <div className="flex w-full flex-col gap-1">
      {isMention && <MentionInput mentionedList={mentionedList} onChoose={setMentionedList} />}

      <form className="relative">
        <Textarea
          placeholder={user ? `내용을 작성해주세요.` : "로그인이 필요합니다."}
          className="text-content-5 resize-none overflow-hidden pr-200pxr text-base"
          {...register("content")}
          onKeyDown={handleKeydown}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <label className="border-layer-5 hover:bg-layer-2 flex cursor-pointer items-center gap-2 rounded-xl border p-3">
            <input type="checkbox" {...register("anonymous")} onClick={handleClickCheckBox} />
            <p className="text-content-4">익명</p>
          </label>
          {onEditClose ? (
            <div className="text-content-4 flex items-center gap-2">
              <button className="bg-layer-3 hover:bg-layer-4 rounded-sm p-3" onClick={onEditClose}>
                취소
              </button>
              <button
                onClick={handleSubmit(handleUpload)}
                className={cn(
                  "text-content-5 border-layer-2 rounded-sm border p-3",
                  watch("content")
                    ? "border-blue-100 bg-blue-100 dark:text-blue-600"
                    : "cursor-not-allowed",
                )}
              >
                확인
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit(handleUpload)}
              className={cn(
                "text-content-1 bg-layer-4 relative h-12 w-12 cursor-pointer rounded-xl",
                watch("content") && "bg-blue-200 text-blue-600",
              )}
            >
              <SendHorizontal
                className={cn(
                  "absolute left-4pxr top-1 h-10 w-10 stroke-2",
                  watch("content") && "fill-blue-300",
                )}
              />
            </button>
          )}
        </div>
      </form>
      <span
        className={cn(
          "text-content-1 text-right text-sm",
          getValues("content") ? "visible" : "invisible",
        )}
      >
        <b>Shift + Enter</b>키를 눌러 새 행을 추가합니다
      </span>
    </div>
  );
};

export default EditorTextArea;
