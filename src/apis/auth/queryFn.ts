import api from "@/apis/core";

import { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  fullName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const postLogin = (loginInfo: LoginRequest) =>
  api.post<AuthResponse>({ url: "/login", data: loginInfo });

export const postRegister = (registerInfo: RegisterRequest) =>
  api.post<AuthResponse>({ url: "/signup", data: registerInfo });

export const postLogout = () => api.post<string>({ url: "/logout" });

export const getUserInfo = () => api.get<User>({ url: "/auth-user" });

export const putUserInfo = (userInfo: string) =>
  api.put<User>({ url: "/settings/update-user", data: { fullName: userInfo, username: "" } });

export const putUserPassword = (password: string) =>
  api.put<string>({ url: "/settings/update-password", data: { password } });

