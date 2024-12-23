/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  semi: true,
  singleQuote: false,
  tabWidth: 4,
  useTabs: true,
  trailingComma: "es5",
};
