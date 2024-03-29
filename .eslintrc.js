module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": [1, "single"],
    "space-before-function-paren": "off",
    indent: [0, 2],
    "no-unused-vars": "off",
    "no-useless-escape": "off",
    "standard/computed-property-even-spacing": "off",
    "vue/no-duplicate-attributes": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
