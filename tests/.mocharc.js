module.exports = {
  require: [
    'tests/spec/helpers/setup.js',
  ],
  spec: 'tests/spec/generators/**/*.js',
  timeout: 5000,
  exit: true,
}
