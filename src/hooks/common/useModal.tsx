import { useOverlay } from "@toss/use-overlay";
import * as Sentry from "@sentry/react";

import LoginModal from "@/components/Layout/Modals/Login";
import ProfileModal from "@/components/Layout/Modals/Profile";
import RegisterModal from "@/components/Layout/Modals/Register";

const useModal = () => {
  const { open } = useOverlay();

  const openLoginModal = () => {
    open(({ isOpen, close }) => {
      return <LoginModal open={isOpen} close={close} />;
    });
  };

  const openRegisterModal = () => {
    open(({ isOpen, close }) => {
      return <RegisterModal open={isOpen} close={close} />;
    });
  };

  const openProfileModal = () => {
    open(({ isOpen, close }) => {
      Sentry.captureMessage("ui 사용 - 사용자 정보 변경 모달 띄우기", "info");
      return <ProfileModal open={isOpen} close={close} />;
    });
  };

  return {
    openLoginModal,
    openRegisterModal,
    openProfileModal,
  };
};

export default useModal;
