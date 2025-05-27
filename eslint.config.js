import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importHelpers from "eslint-plugin-import-helpers";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        name: "base-config",
        files: ["**/*"],
        ignores: ["./node_modules"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "import-helpers": importHelpers
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "import-helpers/order-imports": [
                "warn",
                {
                    newlinesBetween: "never",
                    groups: ["module", "/^~/", ["parent", "sibling", "index"]],
                    alphabetize: { order: "asc", ignoreCase: true }
                }
            ]
        }
    },
    eslintConfigPrettier,
    eslintPluginPrettierRecommended
);
