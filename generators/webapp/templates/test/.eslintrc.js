module.exports = {
  ...require('@dwp/eslint-config-mocha'),
  plugins: ['mocha'],
  globals: {
    sinon: true,
    expect: true,
    request: true,
    clearRequire: true,
    importFresh: true,
    startMockRequire: true,
    stopMockRequire: true,
  },
  overrides: [
    {
      files: [ '*_spec.js' ],
      rules: {
        'no-unused-expressions': 'off',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'warn',
        'func-names': 'off',
        'prefer-arrow-callback': 'off',
        'quote-props': 'off',
        'global-require': 'off',
      }
    }
  ]
}
