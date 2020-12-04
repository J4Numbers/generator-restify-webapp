const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.setup = opts;
  }

  _extendScripts () {
    const allScripts = {
      main: 'src/server/app.js',
      scripts: {
        'compile:assets': 'gulp assets',
        'compile:clean': 'gulp clean',
        'compile:templates': 'node bin/compile.js',
        'compile': 'npm run compile:clean && npm run compile:assets && npm run compile:templates',
        'regenerate-scripts': 'openssl req -x509 rsa:2048 -days 365 -nodes -sha256 -subj "/CN=localhost" -keyout certs/localhost-privkey.pem -out certs/localhost-cert.pem',
        'run:dev': 'node src/server/app.js',
        'security:vulnerable-packages': 'npm audit --registry=https://registry.npmjs.org',
        'test': 'npm run test:mocha',
        'test:mocha': 'NODE_ENV=test nyc --all mocha --config test/.mocharc.js'
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), allScripts);
  }

  _installDependencies () {
    this.npmInstall([ 'bunyan', 'config' ], { save: true });
  }

  _installDevDependencies() {
    this.npmInstall([ '@babel/core', '@babel/preset-env', 'del', 'gulp', 'gulp-babel', 'gulp-sass', 'nunjucks', 'chai', 'chai-as-promised', 'chai-http', 'clear-require', 'import-fresh', 'mocha', 'mock-require', 'nyc', 'sinon', 'sinon-chai' ], { 'save-dev': true });
  }

  install () {
    this._extendScripts();
    this._installDependencies();
    this._installDevDependencies();
  }

  _moveConfigurableFiles () {
    this.fs.copyTpl(
        this.templatePath('./**/*'),
        this.destinationPath('./'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
  }

  shiftFiles () {
    this._moveConfigurableFiles();
  }

};
