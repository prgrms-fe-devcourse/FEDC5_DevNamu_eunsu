import api from "@/apis/core";

import { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const postLogin = (loginInfo: LoginRequest) =>
  api.post<AuthResponse>({ url: "/login", data: loginInfo });

export default postLogin;
