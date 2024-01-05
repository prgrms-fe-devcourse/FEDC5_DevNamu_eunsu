import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils";
import MentionInput from "@/components/common/Mention/MentionInput.tsx";
import RegisterModal from "@/components/Layout/Modals/Register";
import { MyType } from "@/constants/dummyData.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import useEditorLogicByProps, { EditorProps } from "@/hooks/api/useEditorLogicByProps.ts";

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
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { anonymous: true, content: "" },
  });

  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const { upload } = useEditorLogicByProps({ editorProps, nickname });

  const handleUpload = (formValues: FormValues) => {
    upload(formValues);
    setValue("content", "");
  };

  const handleClickCheckBox = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && nickname !== ANONYMOUS_NICKNAME) {
      setValue("anonymous", true);
      // TODO: [24/1/2] 모달 창과 연결
      setRegisterModalOpen((prev) => !prev);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {isMention && <MentionInput choiceList={choiceList} onChoose={setChoiceList} />}

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

      {/*TODO: [24/1/2] openLoginModal 선택값을 변경, 정보 수정 모달 필요 성빈님께 말하기*/}
      <RegisterModal
        open={registerModalOpen}
        toggleOpen={setRegisterModalOpen}
        openLoginModal={() => {}}
      />
    </div>
  );
};

export default EditorTextArea;
