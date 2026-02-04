import nextPlugin from "@next/eslint-plugin-next";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

const eslintConfig = [
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            "@typescript-eslint": typescriptPlugin,
        },
        languageOptions: {
            parser: typescriptParser,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            ...typescriptPlugin.configs.recommended.rules,
        },
    }
];

export default [
    ...eslintConfig,
    {
        ignores: [".next/*"],
    }
];