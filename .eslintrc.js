module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'airbnb-base',
    'plugin:vue/essential',
    '@vue/airbnb',
    // "eslint:recommended",

  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { 'props': false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    eventBus: "readonly",
    event: "readonly",
  },
};
