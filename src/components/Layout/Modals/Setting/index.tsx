import { z } from "zod";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { makeFormFields, SETTING_FIELDS, SETTING_FIELDS_SCHEMA } from "./config";
import ImageUploadForm from "./ImageUploadForm";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const SettingModal = ({ open, toggleOpen }: Props) => {
  const { user, isPending } = useGetUserInfo();

  if (open && !isPending && user) makeFormFields(user);
  const handleSubmit = (settingInfo: z.infer<typeof SETTING_FIELDS_SCHEMA>) => {
    console.log(settingInfo);
  };

  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
      }}
      title="내 프로필 편집"
    >
      <SimpleBaseForm
        fields={SETTING_FIELDS}
        validationSchema={SETTING_FIELDS_SCHEMA}
        onSubmit={handleSubmit}
        submitText="저장"
        cancelText="취소"
      >
        <ImageUploadForm />
      </SimpleBaseForm>
    </SimpleBaseModal>
  );
};

export default SettingModal;
