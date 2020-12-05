module.exports = {
  require: [
    'tests/spec/helpers/setup.js',
    'tests/spec/helpers/server-setup.js',
    'tests/spec/helpers/run-server.js',
  ],
  spec: 'tests/spec/app/**/*.js',
  timeout: 5000,
  exit: true,
};
