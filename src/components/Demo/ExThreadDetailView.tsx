import { useState } from "react";

import ThreadDetailView from "../common/thread/ThreadDetailView";

import useGetThread from "@/apis/thread/useGetThread";

const DEMO_POST_ID = "65982e1bf226073f4c8a0da2";

/**
 * Thread Detail View를 사용하는 페이지의 예시 코드.
 *
 * thread, onClose를 넘겨줘야 한다.
 */
const ExThreadDetailView = () => {
  const [isOpen, setOpen] = useState(true);
  const { thread, isLoading } = useGetThread(DEMO_POST_ID);
  const hideView = !isOpen || !thread || isLoading;

  const handleClose = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleClose}>페이지 다시 열기</button>
      <div className="w-600pxr">
        {!hideView && <ThreadDetailView thread={thread!} onClose={handleClose} />}
      </div>
    </div>
  );
};

export default ExThreadDetailView;
