import { useEffect } from "react";
import * as Sentry from "@sentry/react";

const NotFoundPage = () => {
  useEffect(() => {
    Sentry.captureMessage("visit - NotFoundPage", "info");
  }, []);

  return <div></div>;
};

export default NotFoundPage;
