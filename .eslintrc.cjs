module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.html", "*.cjs", "*.mjs", "*.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import", "unused-imports"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/newline-after-import": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/stores/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/apis/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/hooks/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/pages/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/components/*",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components/ui/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "/public/svg/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/utils/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/types/*",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin", "external"],
        "newlines-between": "always",
      },
    ],
  },
};
