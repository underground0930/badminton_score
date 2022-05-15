// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
}
