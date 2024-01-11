import { toast } from "sonner";

interface ToastParameters {
  message: string;
  duration?: number;
  actionLabel: string;
  onActionClick: () => void;
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

  return { showToast };
};

export default useToast;
