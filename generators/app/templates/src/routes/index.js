const homepageRoutes = require('./homepage_routes');

module.exports = (server) => {
  homepageRoutes(server);
  return server;
};
