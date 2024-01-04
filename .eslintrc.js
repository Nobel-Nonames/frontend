module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single']
  }
}