import { PropsWithChildren, ReactNode } from "react";
import { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props extends PropsWithChildren {
  dialogOptions?: DialogProps;
  title: string;
  header?: ReactNode;
}

const SimpleBaseModal = ({ dialogOptions = {}, title, header, children }: Props) => {
  return (
    <Dialog {...dialogOptions}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-[800px] overflow-y-auto sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{header}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleBaseModal;
