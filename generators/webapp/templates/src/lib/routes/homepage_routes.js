const helloWorld = (req, res, next) => {
  res.send(200, { message: 'Hello world!' });
  next();
};

module.exports = (server) => {
  server.get('/', helloWorld);
};
