const inboundLogger = (req, res, next) => {
  req.log.info(`${req.id} :: Found new ${req.message} request to ${req.getPath()}`);
  next();
};

module.exports = inboundLogger;
