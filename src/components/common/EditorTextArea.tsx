import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils";
import MentionInput from "@/components/common/mention/MentionInput.tsx";
import useEditorLogicByProps, { EditorProps } from "@/hooks/api/useEditorLogicByProps.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import RegisterModal from "@/components/Layout/Modals/Register";

export interface FormValues {
  anonymous: boolean;
  content: string;
}

interface Props {
  isMention: boolean;
  nickname: string;
  editorProps: EditorProps;
}

const EditorTextArea = ({ isMention, nickname, editorProps }: Props) => {
  const [mentionList, setMentionList] = useState<Array<UserDBProps>>([]);

  const { upload } = useEditorLogicByProps({
    editorProps,
    nickname,
    mentionList: mentionList.length ? mentionList : undefined,
  });

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { anonymous: true, content: "" },
  });

  const handleUpload = (formValues: FormValues) => {
    upload(formValues);
    setMentionList([]);
    setValue("content", "");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if ("prevContent" in editorProps) setValue("content", editorProps.prevContent);
  }, []);

  // TODO: [24/1/6] 모달 창은 layout단에 위치 시키고 open 여부를 전역상태관리하며 여기서는 트리거 역할만 하기 제안하기, 승인 시 아래 제거(by 성빈님)
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleClickCheckBox = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && nickname === ANONYMOUS_NICKNAME) {
      setValue("anonymous", true);
      setRegisterModalOpen((prev) => !prev);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {isMention && <MentionInput mentionList={mentionList} onChoose={setMentionList} />}

      <form className="relative">
        <Textarea
          placeholder={`내용을 작성해주세요.`}
          className="resize-none"
          {...register("content")}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <label
            className="flex cursor-pointer items-center gap-2 rounded-xl border p-3"
            htmlFor="anonymous"
          >
            <input
              type="checkbox"
              id="anonymous"
              {...register("anonymous")}
              onClick={handleClickCheckBox}
            />
            <p className="text-gray-500">익명</p>
          </label>
          <button
            onClick={handleSubmit(handleUpload)}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-black",
              watch("content") ? "bg-green-600" : "",
            )}
          >
            <SendHorizontal className="h-10 w-10 fill-amber-50 stroke-2" />
          </button>
        </div>
      </form>

      {/*TODO: [24/1/6] 모달 창은 layout단에 위치 시키고 open 여부를 전역상태관리하며 여기서는 트리거 역할만 하기 제안하기, 승인 시 아래 제거(by 성빈님)*/}
      <RegisterModal
        open={registerModalOpen}
        toggleOpen={setRegisterModalOpen}
        openLoginModal={() => {}}
      />
    </div>
  );
};

export default EditorTextArea;
