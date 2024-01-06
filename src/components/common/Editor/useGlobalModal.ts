import { useState } from "react";

/**
 * 인터페이스 시연 용도의 가짜 기능
 *
 * alert로 어떤 일이 일어난다고 띄우기만 함
 */
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
