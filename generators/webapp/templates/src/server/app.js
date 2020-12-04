const fs = require('fs');
const http = require('http');
const http2 = require('http2');
const config = require('config');
const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: config.get('app.name'),
  level: config.get('logger.level')
});

let server;
if (config.get('app.http2.enabled')) {
  log.info('HTTP/2 configuration accepted...');
  const http2Config = {
    key: fs.readFileSync(config.get('app.http2.key')),
    cert: fs.readFileSync(config.get('app.http2.cert')),
  };
  server = http2.createSecureServer(http2Config);
  server.on('stream', (stream, headers) => {
    const path = headers[':path'] === '/' ? '/index.html' : headers[':path'];
    log.info(`Received new call on ${path}`);

    if (fs.existsSync('out/' + path)) {
      const file = fs.readFileSync('out/' + path);
      let type = 'text/html';
      if (/\.js$/.test(path)) {
        type = 'text/javascript';
      } else if (/\.css$/.test(path)) {
        type = 'text/css';
      } else if (/\.ico$/.test(path)) {
        type = 'image/x-icon';
      } else if (/\.png$/.test(path)) {
        type = 'image/png';
      }
      log.debug(`Found matching file on path ${path}`);
      stream.respond({
        'content-type': type,
        ':status': 200,
      });
      stream.on('error', (error) => log.warn(error));
      stream.end(file);
    } else {
      log.debug(`Unable to find file on path ${path}`);
      stream.respond({
        'content-type': 'text/html',
        ':status': 404,
      });
      stream.end(`<h1>404 - Page not found</h1>`);
    }
  });
} else {
  log.info('HTTP configuration accepted...');
  server = http.createServer((req, res) => {
    const path = req.url === '/' ? '/index.html' : req.url;
    log.info(`Received new call on ${path}`);

    if (fs.existsSync('out/' + path)) {
      const file = fs.readFileSync('out/' + path);
      let type = 'text/html';
      if (/\.js$/.test(path)) {
        type = 'text/javascript';
      } else if (/\.css$/.test(path)) {
        type = 'text/css';
      } else if (/\.ico$/.test(path)) {
        type = 'image/x-icon';
      } else if (/\.png$/.test(path)) {
        type = 'image/png';
      }
      log.debug(`Found matching file on path ${path}`);
      res.writeHead(200, { 'content-type': type });
      res.end(file);
    } else {
      log.debug(`Unable to find file on path ${path}`);
      res.writeHead(404, { 'content-type': 'text/html' });
      res.end(`<h1>404 - Page not found</h1>`);
    }
  });
}

log.info(`Listening on port ${config.get('app.port')}`);
server.listen(config.get('app.port'));

module.exports = server;
