import { AxiosError } from "axios";
import { toast } from "sonner";

interface ToastParameters {
  message: string;
  duration?: number;
  actionLabel: string;
  onActionClick: () => void;
}

interface PromiseToastParameters<T> {
  promise: Promise<T>;
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: AxiosError) => string);
  };
}

const useToast = () => {
  const showToast = ({ message, duration = 2000, actionLabel, onActionClick }: ToastParameters) => {
    toast(message, {
      action: actionLabel
        ? {
            label: actionLabel,
            onClick: onActionClick,
          }
        : undefined,
      duration,
    });
  };

  const showPromiseToast = <T>({ promise, messages }: PromiseToastParameters<T>) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: (data) =>
        typeof messages.success === "function" ? messages.success(data) : messages.success,
      error: (error) =>
        typeof messages.error === "function" ? messages.error(error) : messages.error,
    });
  };

  return { showToast, showPromiseToast };
};

export default useToast;
