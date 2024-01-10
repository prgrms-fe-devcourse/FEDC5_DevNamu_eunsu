import { z } from "zod";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { makeFormFields, SETTING_FIELDS, SETTING_FIELDS_SCHEMA } from "./config";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import usePutProfile from "@/apis/auth/usePutProfile";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const SettingModal = ({ open, toggleOpen }: Props) => {
  const { user, isPending } = useGetUserInfo();
  const { updateUserName, updatePassword } = usePutProfile();

  if (open && !isPending && user) makeFormFields(user);

  const handleSubmit = (settingInfo: z.infer<typeof SETTING_FIELDS_SCHEMA>) => {
    const oldNickname = user?.nickname;
    if (oldNickname !== settingInfo.nickname) {
      const fullName = { name: settingInfo.name, nickname: settingInfo.nickname };
      const userInfo = JSON.stringify(fullName);
      updateUserName(userInfo);
      // TODO: 닉네임이 같은 경우 안내 처리 (2024-01-10)
    } else alert("닉네임이 이전 닉네임과 동일합니다.");
    if (settingInfo.password) {
      updatePassword(settingInfo.password);
    }
    // TODO: 에러 모달 처리 (2024-01-09)
    toggleOpen(false);
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
      />
    </SimpleBaseModal>
  );
};

export default SettingModal;
