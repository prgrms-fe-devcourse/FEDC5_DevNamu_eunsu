import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export interface FieldProps {
  name: string;
  type: string;
  label: string;
  defaultValue?: string;
  autoFocus?: boolean;
  desc?: string;
  placeholder?: string;
  /**
   * <input>의 autocomplete 속성 문서 참고:
   * @see https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/
   */
  autoComplete?: "username" | "current-password" | "new-password" | "nickname";
}

export interface SimpleFormProps {
  fields: FieldProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: z.ZodEffects<z.ZodObject<any>> | z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
  submitText: string;
}

const SimpleBaseForm = ({ fields, validationSchema, submitText, onSubmit }: SimpleFormProps) => {
  const defaultValues = fields.reduce((sum, { name, defaultValue }) => {
    // defaultValue를 무조건 지정해줘야 하므로 생성
    return {
      ...sum,
      [name]: defaultValue ?? "",
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
        {fields.map(({ name, label, desc, ...props }) => (
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
        <Button type="submit">{submitText}</Button>
      </form>
    </Form>
  );
};

export default SimpleBaseForm;
