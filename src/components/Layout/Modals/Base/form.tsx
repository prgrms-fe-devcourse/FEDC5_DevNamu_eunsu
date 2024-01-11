import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export interface FieldProps {
  name: string;
  type: string;
  label: string;
  autoFocus?: boolean;
  desc?: string;
  placeholder?: string;
  /**
   * <input>의 autocomplete 속성 문서 참고:
   * @see https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/
   */
  autoComplete?: "username" | "current-password" | "new-password" | "nickname" | "off";
  readOnly?: boolean;
  value?: string;
  disabled?: boolean;
}

// TODO: zod의 any 타입 제거 및 재귀 타입 어떻게 생성할지 고민해보기 (2024-01-08)
export interface SimpleFormProps extends PropsWithChildren {
  fields: FieldProps[];
  validationSchema: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<any>>>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | z.ZodEffects<z.ZodEffects<z.ZodObject<any>>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
  submitText: string;
  cancelText?: string;
}

const SimpleBaseForm = ({
  fields,
  validationSchema,
  submitText,
  cancelText,
  onSubmit,
  children,
}: SimpleFormProps) => {
  const defaultValues = fields.reduce((sum, { name, value }) => {
    // defaultValue를 무조건 지정해줘야 하므로 생성
    return {
      ...sum,
      [name]: value ?? "",
    };
  }, {});

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: "all", // react-hook-form의 기본 값이 onSubmit
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {children}
        {fields.map(({ name, label, desc, disabled, ...props }) => (
          <FormField
            key={name}
            name={name}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...props} // type, autoFocus, placeholder, autoComplete
                    {...field}
                    disabled={disabled}
                    {...form.register(name, {
                      required: false,
                      // react-hook-form의 기본값이 required: true,
                      // 이렇게 하는 이유는 Required 메시지 커스터마이징이 안 되기 때문
                    })}
                  />
                </FormControl>
                <FormDescription>{desc}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex items-center justify-center">
          <Button type="submit">{submitText}</Button>
          {cancelText && (
            <DialogClose className="ml-2 rounded-md border bg-background px-4 py-2.5 text-sm font-medium">
              {cancelText}
            </DialogClose>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SimpleBaseForm;
