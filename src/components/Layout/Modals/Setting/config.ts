import { z } from "zod";

import { FieldProps } from "../Base/form";

export interface UserInfo {
  name: string;
  email: string;
  nickname: string;
}

export const SETTING_FIELDS: FieldProps[] = [];

export const makeFormFields = ({ name, email, nickname }: UserInfo) => {
  const result: FieldProps[] = [
    {
      name: "name",
      type: "text",
      label: "이름",
      readOnly: true,
      value: name,
    },
    {
      name: "email",
      type: "email",
      label: "이메일",
      readOnly: true,
      value: email,
    },
    {
      name: "nickname",
      type: "text",
      label: "닉네임",
      autoComplete: "nickname",
      value: nickname,
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
  SETTING_FIELDS.splice(0, SETTING_FIELDS.length, ...result);
};

export const SETTING_FIELDS_SCHEMA = z
  .object({
    name: z.string(),
    nickname: z.string().trim().min(1, {
      message: "닉네임을 입력해주세요",
    }),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ password, passwordConfirm }) =>
      (password.length && password === passwordConfirm) ||
      (!password.length && !passwordConfirm.length),
    {
      message: "비밀번호가 일치하지 않습니다",
      path: ["passwordConfirm"],
    },
  )
  .refine(({ password }) => password.length >= 8 || !password.length, {
    message: "비밀번호는 8글자 이상이어야 합니다",
    path: ["password"],
  });
