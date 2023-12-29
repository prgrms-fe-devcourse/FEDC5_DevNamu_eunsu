import { ReactNode } from "react";
import { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  dialogOptions?: DialogProps;
  title: string;
  fields: {
    id: string;
    type: string;
    label: string;
    autoFocus?: boolean;
  }[];
  header: ReactNode;
  footer: ReactNode;
}

/**
 * shadcn 기반 Modal 간 중복 코드 제거를 위한 뼈대
 *
 * 간단한 기능을 위한 단순한 추상화를 의도했습니다.
 */
const SimpleModalFrame = ({ dialogOptions = {}, title, fields, header, footer }: Props) => {
  return (
    <Dialog {...dialogOptions}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{header}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map(({ id, type, label, autoFocus }) => (
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor={id} className="text-right">
                {label}
              </Label>
              <Input id={id} type={type} autoFocus={autoFocus} className="col-span-3" />
            </div>
          ))}
        </div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleModalFrame;
