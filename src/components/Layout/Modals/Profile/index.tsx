import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { makeFormFields, PROFILE_FIELDS, PROFILE_FIELDS_SCHEMA } from "./config";
import ImageUploadForm from "./ImageUploadForm";

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
  const [isClickedUploadImage, setIsClickedUploadImage] = useState(false);

  if (open && !isPending && user) makeFormFields(user);

  useEffect(() => {
    if (open) toast.info("프로필 이미지와 닉네임, 비밀번호 설정이 각각 가능합니다.");
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
            gtag("event", "ui사용_사용자_닉네임_변경");
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
            gtag("event", "ui사용_사용자_비밀번호_변경");
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
            gtag("event", "ui사용_사용자 프로필 변경");
            return AUTH_SUCCESS_MESSAGE.UPDATE_ALL_PROFILE;
          },
          error: AUTH_ERROR_MESSAGE.UPDATE_ALL_PROFILE,
        },
      });
    } else {
      if (!isClickedUploadImage) toast.warning(AUTH_ERROR_MESSAGE.NO_CHANGE);
      else setIsClickedUploadImage(false);
    }
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
      >
        <ImageUploadForm profileImage={user?.image} setIsClicked={setIsClickedUploadImage} />
      </SimpleBaseForm>
    </SimpleBaseModal>
  );
};

export default ProfileModal;
