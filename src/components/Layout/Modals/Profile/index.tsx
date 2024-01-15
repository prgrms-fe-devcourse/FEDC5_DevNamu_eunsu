import { z } from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { makeFormFields, PROFILE_FIELDS, PROFILE_FIELDS_SCHEMA } from "./config";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import usePutProfile from "@/apis/auth/usePutProfile";
import { AUTH_ERROR_MESSAGE, AUTH_SUCCESS_MESSAGE } from "@/constants/toastMessage";
import useToast from "@/hooks/common/useToast";

interface Props {
  open: boolean;
  close: () => void;
}

const ProfileModal = ({ open, close }: Props) => {
  const { user, isPending } = useGetUserInfo();
  const { updateUserName, updatePassword, updateAllProfile } = usePutProfile();
  const { showPromiseToast } = useToast();

  if (open && !isPending && user) makeFormFields(user);

  useEffect(() => {
    if (open) toast.info("닉네임과 비밀번호 설정이 각각 가능합니다.");
  }, [open]);

  const handleSubmit = ({ name, nickname, password }: z.infer<typeof PROFILE_FIELDS_SCHEMA>) => {
    const previousNickname = user?.nickname;
    const isNicknameChanged = previousNickname !== nickname;
    const fullName = { name, nickname };
    const userInfo = JSON.stringify(fullName);
    if (isNicknameChanged && !password) {
      showPromiseToast({
        promise: updateUserName(userInfo),
        messages: {
          success: () => {
            close();
            Sentry.captureMessage("ui 사용 - 사용자 닉네임 변경", "info");
            return AUTH_SUCCESS_MESSAGE.UPDATE_PROFILE;
          },
          error: AUTH_ERROR_MESSAGE.SERVER_ERROR,
        },
      });
    } else if (!isNicknameChanged && password) {
      showPromiseToast({
        promise: updatePassword(password),
        messages: {
          success: () => {
            close();
            Sentry.captureMessage("ui 사용 - 사용자 비밀번호 변경", "info");
            return AUTH_SUCCESS_MESSAGE.UPDATE_PASSWORD;
          },
          error: AUTH_ERROR_MESSAGE.SERVER_ERROR,
        },
      });
    } else if (isNicknameChanged && password) {
      showPromiseToast({
        promise: updateAllProfile(userInfo, password),
        messages: {
          success: () => {
            close();
            Sentry.captureMessage("ui 사용 - 사용자 프로필 변경", "info");
            return AUTH_SUCCESS_MESSAGE.UPDATE_ALL_PROFILE;
          },
          error: AUTH_ERROR_MESSAGE.UPDATE_ALL_PROFILE,
        },
      });
    } else toast.warning(AUTH_ERROR_MESSAGE.NO_CHANGE);
  };

  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: close,
      }}
      title="내 프로필 편집"
    >
      <SimpleBaseForm
        fields={PROFILE_FIELDS}
        validationSchema={PROFILE_FIELDS_SCHEMA}
        onSubmit={handleSubmit}
        submitText="저장"
        cancelText="취소"
      />
    </SimpleBaseModal>
  );
};

export default ProfileModal;
