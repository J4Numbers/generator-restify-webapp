let app = undefined;

global.getServer = () => {
  if (app === undefined) {
    app = server();
  }
  return app;
};

getServer();
