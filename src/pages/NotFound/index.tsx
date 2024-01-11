import { useEffect } from "react";
import * as Sentry from "@sentry/react";

const NotFoundPage = () => {
  useEffect(() => {
    Sentry.captureMessage("visit - NotFoundPage");
  }, []);

  return <div></div>;
};

export default NotFoundPage;
