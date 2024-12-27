import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], 
    languageOptions: {
      parser: tsParser,
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
  },
];
