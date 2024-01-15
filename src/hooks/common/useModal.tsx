import { useOverlay } from "@toss/use-overlay";

import LoginModal from "@/components/Layout/Modals/Login";
import ProfileModal from "@/components/Layout/Modals/Profile";
import RegisterModal from "@/components/Layout/Modals/Register";

const useModal = () => {
  const { open } = useOverlay();

  const openLoginModal = () => {
    open(({ isOpen, close }) => {
      return <LoginModal open={isOpen} toggleOpen={close} />;
    });
  };

  const openRegisterModal = () => {
    open(({ isOpen, close }) => {
      return <RegisterModal open={isOpen} toggleOpen={close} />;
    });
  };

  const openProfileModal = () => {
    open(({ isOpen, close }) => {
      return <ProfileModal open={isOpen} toggleOpen={close} />;
    });
  };

  return {
    openLoginModal,
    openRegisterModal,
    openProfileModal,
  };
};

export default useModal;
