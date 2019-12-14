module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    '@vue/typescript'
  ],
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "ban-ts-ignore": "off",
    "curly": ["error", "multi"],
    "indent": ["error", 2],
    "import/prefer-default-export": "off",
    "interface-name": 0,
    "linebreak-style": 0,
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    "no-multiple-empty-lines": 2,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "object-literal-sort-keys": 0,
    "prefer-template": 2,
    "semi": [2, "never"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 3,
      "multiline": {
        "max": 3,
        "allowFirstLine": false
      }
    }],
    "vue/no-parsing-error": ["error", {
      "invalid-first-character-of-tag-name": false
    }],
  }
};
