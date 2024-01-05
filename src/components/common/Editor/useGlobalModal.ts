import { useState } from "react";

const useGlobalModal = () => {
  const [, setLoginModalOpen] = useState(false);
  const [, setUserChangeModalOpen] = useState(false);

  const openLoginModal = () => {
    alert("openLoginModalOpen");
    setLoginModalOpen(true);
  };

  const openUserChangeModal = () => {
    alert("openUserChangeModal");
    setUserChangeModalOpen(true);
  };

  return { openLoginModal, openUserChangeModal };
};

export default useGlobalModal;
