import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "semi": "error",
      "quotes": "error",
      "indent": "error",
      "linebreak-style": "error",
      "no-console": "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-unused-imports": "error",
      "no-unused-vars": "error",
      "no-unused-vars": "error",
    },
  }),
];

export default eslintConfig;
