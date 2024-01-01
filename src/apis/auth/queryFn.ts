import api from "@/apis/core";

import { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

const postLogin = (loginInfo: LoginRequest) =>
  api.post<LoginResponse>({ url: "/login", data: loginInfo });

export default postLogin;
