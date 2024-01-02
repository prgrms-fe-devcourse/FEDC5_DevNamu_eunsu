import { z } from "zod";

import { FieldProps } from "../Base/form";

export const REGISTER_FIELDS: FieldProps[] = [
  {
    name: "name",
    type: "text",
    label: "이름",
    autoFocus: true,
  },
  {
    name: "email",
    type: "email",
    label: "이메일",
    autoComplete: "username",
  },
  {
    name: "nickname",
    type: "text",
    label: "닉네임(선택)",
    placeholder: "미기입 시 프롱이로 설정됩니다.",
  },
  {
    name: "password",
    type: "password",
    label: "비밀번호",
    autoComplete: "new-password",
  },
  {
    name: "passwordConfirm",
    type: "password",
    label: "비밀번호 확인",
    autoComplete: "new-password",
  },
];

export const REGISTER_FIELDS_SCHEMA = z
  .object({
    name: z.string().min(1, {
      message: "이름을 입력해주세요",
    }),
    email: z
      .string()
      .min(1, {
        message: "이메일을 입력해주세요",
      })
      .email("이메일 형식이 아닙니다"),
    nickname: z.string().trim(),
    password: z.string().min(8, {
      message: "비밀번호는 8글자 이상이어야 합니다",
    }),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
