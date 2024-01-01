import api from "@/apis/core";

import { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const postLogin = (data: LoginRequest) => api.post<LoginResponse>({ url: "/login", data });

export default postLogin;
