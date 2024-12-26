// import typescriptPlugin from "@typescript-eslint/eslint-plugin";
// import prettierConfig from "eslint-config-prettier";
// import pkg from 'eslint-plugin-prettier';

// const { eslintPluginPrettier } = pkg;

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], 
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
      },
    },
    // plugins: {
    //   prettier: eslintPluginPrettier,
    //   "@typescript-eslint": typescriptPlugin,
    // },
    // rules: {
    //   ...typescriptPlugin.configs.recommended.rules, // Recommended TypeScript rules
    //   ...prettierConfig.rules, // Prettier rules for formatting
    //   "prettier/prettier": "error", // Ensure Prettier rules are enforced
    //   "no-console": "warn", // Warn about `console.log`
    //   "prefer-const": "error", // Use `const` where possible
    //   "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore `_` in unused vars
    // },
  },
];
