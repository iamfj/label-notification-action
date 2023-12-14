module.exports = {
  extends: ['plugin:jsonc/recommended-with-jsonc', './node_modules/gts/'],
  env: {
    'jest/globals': true,
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['.*', '**/.*', '*.config.*', '**/*.config.*'],
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-missing-import': 'off',
      },
    },
  ],
  settings: {
    jest: {
      version: require('jest/package.json').version,
    },
  },
};
