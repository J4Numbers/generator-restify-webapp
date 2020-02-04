const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.setup = opts;
  }

  _extendScripts () {
    const allScripts = {
      main: 'src/app.js',
      scripts: {
        'quality:eslint': 'eslint .',
        'quality:eslint:fix': 'eslint . --fix',
        'regenerate-scripts': 'openssl req -x509 rsa:2048 -nodes -sha256 -subj "/CN=localhost" -keyout test/spec/helpers/certs/localhost-privkey.pem -out test/spec/helpers/certs/localhost-cert.pem',
        'security:vulnerable-packages': 'npm audit --registry=https://registry.npmjs.org',
        'start': 'node src/app.js',
        'test': 'npm run test:mocha',
        'test:mocha': 'NODE_ENV=test nyc --all mocha --config test/.mocharc.js'
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), allScripts);
  }

  _installDependencies () {
    this.npmInstall([ 'bunyan', 'config', 'restify', 'restify-errors', 'uuid' ], { save: true });
  }

  _installDevDependencies() {
    this.npmInstall([ '@dwp/eslint-config-base', '@dwp/eslint-config-mocha', 'chai', 'chai-as-promised', 'chai-http', 'clear-require', 'eslint', 'import-fresh', 'mocha', 'mock-require', 'nyc', 'sinon', 'sinon-chai' ], { 'save-dev': true });
  }

  install () {
    this._extendScripts();
    this._installDependencies();
    this._installDevDependencies();
  }

  _moveConfigs () {
    this.fs.copy(
        this.templatePath('./**/*'),
        this.destinationPath('./'),
        { globOptions: { dot: true } },
    )
  }

  shiftFiles () {
    this._moveConfigs();
  }

};
