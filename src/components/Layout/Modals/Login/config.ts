import { z } from "zod";

import { FieldProps } from "../Base/form";

export const LOGIN_FIELDS: FieldProps[] = [
  {
    name: "email",
    type: "email",
    label: "이메일",
    autoFocus: true,
    placeholder: "prong@gmail.com",
    autoComplete: "username",
  },
  {
    name: "password",
    type: "password",
    label: "비밀번호",
    autoComplete: "current-password",
  },
];

export const LOGIN_FIELDS_SCHEMA = z.object({
  email: z.string().trim(),
  password: z.string().min(8, {
    message: "비밀번호는 8글자 이상이어야 합니다",
  }),
});
