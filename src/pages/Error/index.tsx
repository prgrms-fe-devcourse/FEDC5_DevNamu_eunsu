import { Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Event Listener, Promise 등의 예외가 아닌 React 실행 중(Hook, JSX)의 오류는 Error Boundary에서 캐치 가능합니다.
 *
 * React 실행 중의 오류는 화면이 흰색으로 바뀌기 때문에 fallback UI가 필요합니다.
 */
const ErrorPage = () => {
  const handleGoToHomeClick = () => {
    window.location.href = "/";
    gtag("event", `ui사용_오류_발생_후_홈으로_이동`);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="max-w-500pxr">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>데브나무</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            죄송합니다. 오류가 발생했습니다
            {/* Router 바깥이어서 <Link> 사용 불가능 */}
            <Button onClick={handleGoToHomeClick}>홈으로 이동하기</Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ErrorPage;
