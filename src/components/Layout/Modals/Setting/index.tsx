import { z } from "zod";
import { toast } from "sonner";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { makeFormFields, SETTING_FIELDS, SETTING_FIELDS_SCHEMA } from "./config";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import usePutProfile from "@/apis/auth/usePutProfile";
import {
  AUTH_ERROR_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
  LOADING_MESSAGE,
} from "@/constants/toastMessage";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const SettingModal = ({ open, toggleOpen }: Props) => {
  const { user, isPending } = useGetUserInfo();
  const { updateUserName, updatePassword } = usePutProfile();

  if (open && !isPending && user) makeFormFields(user);

  const handleSubmit = ({ name, nickname, password }: z.infer<typeof SETTING_FIELDS_SCHEMA>) => {
      const fullName = { name, nickname };
      const userInfo = JSON.stringify(fullName);
    const previousNickname = user?.nickname;
    const isNicknameChanged = previousNickname !== nickname;
    if (isNicknameChanged && !password) {
      toast.promise(updateUserName(userInfo), {
        loading: LOADING_MESSAGE,
        success: () => {
          toggleOpen(false);
          return AUTH_SUCCESS_MESSAGE.UPDATE_PROFILE;
        },
        error: AUTH_ERROR_MESSAGE.SERVER_ERROR,
      });
    } else if (!isNicknameChanged && password) {
      toast.promise(updatePassword(password), {
        loading: LOADING_MESSAGE,
        success: () => {
          toggleOpen(false);
          return AUTH_SUCCESS_MESSAGE.UPDATE_PASSWORD;
        },
        error: AUTH_ERROR_MESSAGE.SERVER_ERROR,
      });
    } else if (isNicknameChanged && password) {
          toggleOpen(false);
    } else toast.warning(AUTH_ERROR_MESSAGE.SAME_NICKNAME);
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
