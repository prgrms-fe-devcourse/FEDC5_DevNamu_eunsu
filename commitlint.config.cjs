module.exports = {
  extends: ["@commitlint/config-conventional"],
  /*
    type(scope?): subject // 여기 전체를 header
    body?
    footer?
  */
  // 0=off, 1=warn, 2=error
  // always=allow, never=disallow
  rules: {
    "header-max-length": [2, "always", 100],
    "subject-case": [0], // subject에서 camelCase 등 영문 관련 규칙 해제
    "subject-empty": [2, "never"], // subject 생략 불가
    "subject-full-stop": [2, "never", "."], // subject .으로 못 끝나게
    "type-case": [2, "never"], // 대소문자 허용 불가
    "type-empty": [2, "never"], // type 생략 불가
    "type-enum": [
      // 아래의 type만 사용 가능
      2,
      "always",
      ["Feat", "Fix", "Docs", "Style", "Refactor", "Test", "Chore", "Modify", "Rename", "Cleanup"],
    ],
  },
};
