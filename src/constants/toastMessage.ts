export const AUTH_ERROR_RESPONSE = {
  ALREADY_USED_EMAIL: "The email address is already being used.",
  LOGIN_FAILED: "Your email and password combination does not match an account.",
  IMAGE_UNMATCHED: "Please upload an image.",
};

export const AUTH_ERROR_MESSAGE = {
  UNKNOWN_NAME: "없는 프롱이 입니다.",
  ALREADY_USED_EMAIL: "이미 사용중인 이메일 입니다.",
  LOGIN_FAILED: "이메일과 비밀번호가 일치하지 않습니다.",
  SERVER_ERROR: "서버에 문제가 생겼습니다. 잠시 후 다시 시도해주세요.",
  UPDATE_ALL_PROFILE: "닉네임과 비밀번호 설정에 실패하였습니다.",
  NO_CHANGE: "낙네임이나 비밀번호를 변경하지 않았습니다.",
  LOGOUT: "로그아웃에 실패했습니다 :(",
  IMAGE_UNMATCHED: "이미지를 첨부해주세요!",
  PROFILE_IMAGE_UPLOAD: "프로필 이미지 업로드에 실패했습니다.",
};

export const AUTH_SUCCESS_MESSAGE = {
  UPDATE_PROFILE: "프로필 닉네임이 수정되었습니다.",
  UPDATE_PASSWORD: "비밀번호가 수정되었습니다.",
  UPDATE_ALL_PROFILE: "닉네임과 비밀번호가 수정되었습니다.",
  LOGOUT: "로그아웃 되었습니다 :D",
  PROFILE_IMAGE_UPLOAD: "프로필 이미지가 업로드 되었습니다!",
  LOGIN(nickname: string) {
    return `어서오세요, ${nickname}님!`;
  },
  REGISTER(name: string) {
    return `환영합니다, ${name}님!`;
  },
};

export const LOADING_MESSAGE = "잠시만 기다려주세요...";
