module.exports = {
  app: {
    http2: {
      enabled: false,
      key: '/path/to/key/file',
      cert: '/path/to/cert/file',
    },
    name: '<%= app_name %>',
    hostname: 'localhost',
    port: '8080',
  },
  functionality: {},
  nunjucks: {
    options: {},
  },
  logger: {
    level: 'info',
  },
};
