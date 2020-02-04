module.exports = {
  app: {
    <%_ if (enable_http2) { %>
    http2: {
      enabled: false,
      key: '/path/to/key/file',
      cert: '/path/to/cert/file',
    },
    <% } -%>
    name: '<%= app_name %>',
    hostname: 'localhost',
    port: '8080',
  },
  functionality: {},
  <%_ if (enable_html) { %>
  nunjucks: {
    options: {},
  },
  <% } -%>
  logger: {
    level: 'info',
  },
};
