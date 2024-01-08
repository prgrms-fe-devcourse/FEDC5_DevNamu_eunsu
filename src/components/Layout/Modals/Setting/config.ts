import { z } from "zod";

import { FieldProps } from "../Base/form";

export const SETTING_FIELDS: FieldProps[] = [
  {
    name: "name",
    type: "text",
    label: "이름",
    autoFocus: true,
    autoComplete: "off",
    readOnly: true,
    value: "프롱이",
  },
  {
    name: "email",
    type: "email",
    label: "이메일",
    autoComplete: "username",
    readOnly: true,
    value: "email@naver.com",
  },
  {
    name: "nickname",
    type: "text",
    label: "닉네임",
    autoComplete: "nickname",
    value: "프롱이",
  },
  {
    name: "password",
    type: "password",
    label: "새 비밀번호",
    autoComplete: "new-password",
  },
  {
    name: "passwordConfirm",
    type: "password",
    label: "새 비밀번호 확인",
    autoComplete: "new-password",
  },
];

export const SETTING_FIELDS_SCHEMA = z
  .object({
    nickname: z.string().trim().min(1, {
      message: "닉네임을 입력해주세요",
    }),
    password: z.string().min(8, {
      message: "비밀번호는 8글자 이상이어야 합니다",
    }),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
