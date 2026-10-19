import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Carga de configuraciones Next mediante compat
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      // Reglas básicas (evitar conflictos con Prettier)
      semi: "error",
      // Desactivar reglas de estilo que maneja Prettier
      quotes: "off",
      indent: "off",
      "linebreak-style": "off",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
    },
  }),
  // TypeScript ya valida los nombres (incluido el espacio de nombres global `React` de los tipos),
  // así que `no-undef` solo genera falsos positivos en .ts/.tsx
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
  // Registro explícito del plugin Prettier en Flat Config
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // No bloquear el build por formato; se puede volver a 'error' si se desea
      "prettier/prettier": "off",
    },
  },
];

export default eslintConfig;
