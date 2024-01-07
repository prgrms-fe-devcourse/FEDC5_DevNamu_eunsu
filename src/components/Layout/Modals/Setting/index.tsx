import { z } from "zod";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { SETTING_FIELDS, SETTING_FIELDS_SCHEMA } from "./config";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const SettingModal = ({ open, toggleOpen }: Props) => {
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
      </SimpleBaseForm>
    </SimpleBaseModal>
  );
};

export default SettingModal;
