module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  "rules": {
    "semi": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "no-param-reassign": "error",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "_.+" }]
  },
}