import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import * as Sentry from "@sentry/react";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils";
import MentionInput from "@/components/common/mention/MentionInput.tsx";
import { ANONYMOUS_NICKNAME } from "@/constants/commonConstants.ts";
import useEditorLogicByProps, {
  EditorProps,
  getTypeOfEditor,
} from "@/hooks/api/useEditorLogicByProps.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";
import useModal from "@/hooks/common/useModal";
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
  const { openLoginModal, openProfileModal } = useModal();
  const { showToast } = useToast();

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
          openLoginModal();
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

  // TODO: [24/1/6] 모달 창은 layout단에 위치 시키고 open 여부를 전역상태관리하며 여기서는 트리거 역할만 하기 제안하기, 승인 시 아래 제거(by 성빈님)
  const handleClickCheckBox = (e: FormEvent<HTMLInputElement>) => {
    // TODO: [24/1/11] nickname은 props로 받아오는게 맞다고 생각합니다. 하지만 여러곳에서 수정이 필요해지니 현재 에디터에 user를 가지고 있어서 임시방편으로 수정하겠습니다.
    if (!e.currentTarget.checked && user?.nickname === ANONYMOUS_NICKNAME) {
      Sentry.captureMessage("ui 사용 - 익명 여부 토글", "info");
      setValue("anonymous", true);
      openProfileModal();
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
          className="resize-none overflow-hidden pr-200pxr text-base"
          {...register("content")}
          onKeyDown={handleKeydown}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-3">
            <input type="checkbox" {...register("anonymous")} onClick={handleClickCheckBox} />
            <p className="text-gray-500">익명</p>
          </label>
          {onEditClose ? (
            <div className="flex items-center gap-2 text-white ">
              <button className="rounded-sm bg-gray-400 p-3" onClick={onEditClose}>
                취소
              </button>
              <button
                onClick={handleSubmit(handleUpload)}
                className={cn(
                  "rounded-sm p-3",
                  watch("content")
                    ? "border border-[#19d23d] bg-[#19d23d]"
                    : "border border-gray-300 text-black",
                )}
              >
                확인
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit(handleUpload)}
              className={cn(
                "flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-black",
                watch("content") ? "bg-[#19d23d]" : "",
              )}
            >
              <SendHorizontal className="h-10 w-10 fill-amber-50 stroke-2" />
            </button>
          )}
        </div>
      </form>
      <span className={cn("text-right text-sm", getValues("content") ? "visible" : "invisible")}>
        <b>Shift + Enter</b>키를 눌러 새 행을 추가합니다
      </span>
    </div>
  );
};

export default EditorTextArea;
