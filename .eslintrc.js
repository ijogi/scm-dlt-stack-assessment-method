module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest',
  ],
  settings: {
    'import/core-modules': ['vue', 'vuex'], // these modules are included in nuxt.js
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/require-prop-types': 'warn',
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'keyword-spacing': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'space-in-parens': ['error', 'never'],
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    'prefer-template': 'error',
    'import/extensions': [2],
  },
}
