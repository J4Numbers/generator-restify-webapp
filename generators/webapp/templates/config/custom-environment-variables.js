module.exports = {
  app: {
    <% if (enable_http2) { %>
    http2: {
      enabled: 'APP_HTTP2_ENABLED',
      key: 'APP_HTTP2_KEY',
      cert: 'APP_HTTP2_CERT',
    },
    <% } -%>
    name: 'APP_NAME',
    host: 'APP_HOSTNAME',
    port: 'APP_PORT',
  },
  logger: {
    level: 'LOGGER_LEVEL',
  },
};
