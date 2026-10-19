const eslint = require("@eslint/js");

module.exports = [
  {
    files: ["eslint.config.js", "tests/**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
      },
    },
  },
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        module: "readonly",
      },
    },
  },
  eslint.configs.recommended,
];
