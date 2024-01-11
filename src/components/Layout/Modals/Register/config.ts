import { z } from "zod";

import { FieldProps } from "../Base/form";

import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

export const REGISTER_FIELDS: FieldProps[] = [
  {
    name: "name",
    type: "text",
    label: "이름",
    autoFocus: true,
    autoComplete: "off",
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
    placeholder: `미기입 시 ${ANONYMOUS_NICKNAME}로 설정됩니다.`,
    autoComplete: "nickname",
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
  .refine(({ nickname }) => nickname !== ANONYMOUS_NICKNAME, {
    message: "기본 닉네임은 사용할 수 없습니다",
    path: ["nickname"],
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
