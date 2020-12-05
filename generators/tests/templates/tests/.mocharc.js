module.exports = {
  require: [
    'test/spec/helpers/setup.js',
    'test/spec/helpers/server-setup.js',
    'test/spec/helpers/run-server.js',
  ],
  spec: 'test/spec/app/**/*.js',
  timeout: 5000,
  exit: true,
};