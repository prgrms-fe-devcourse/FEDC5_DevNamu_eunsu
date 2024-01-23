import { AxiosError } from "axios";
import { toast } from "sonner";

import { LOADING_MESSAGE } from "@/constants/toastMessage";

interface ToastParameters {
  message: string;
  duration?: number;
  actionLabel?: string;
  onActionClick?: () => void;
}

interface PromiseToastParameters<T> {
  promise: Promise<T>;
  messages: {
    success: string | ((data: T) => string);
    error: string | ((error: AxiosError) => string);
  };
}

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const useToast = () => {
  const showToast = ({ message, duration = 2000, actionLabel, onActionClick }: ToastParameters) => {
    const toastOptions: ToastOptions = {
      duration,
    };

    if (actionLabel && onActionClick) {
      toastOptions.action = {
        label: actionLabel,
        onClick: onActionClick,
      };
    }

    toast(message, toastOptions);
  };

  const showPromiseToast = <T>({ promise, messages }: PromiseToastParameters<T>) => {
    toast.promise(promise, {
      loading: LOADING_MESSAGE,
      success: (data) =>
        typeof messages.success === "function" ? messages.success(data) : messages.success,
      error: (error) =>
        typeof messages.error === "function" ? messages.error(error) : messages.error,
    });
  };

  return { showToast, showPromiseToast };
};

export default useToast;
