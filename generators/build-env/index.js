const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.setup = opts;
  }

  _extendScripts () {
    const allScripts = {
      scripts: {
        'compile:assets': 'gulp assets',
        'compile:clean': 'gulp clean',
        'compile:templates': 'node bin/compile.js',
        'compile': 'npm run compile:clean && npm run compile:assets && npm run compile:templates',
        'regenerate-scripts': 'openssl req -x509 rsa:2048 -days 365 -nodes -sha256 -subj "/CN=localhost" -keyout certs/localhost-privkey.pem -out certs/localhost-cert.pem',
        'security:vulnerable-packages': 'npm audit --registry=https://registry.npmjs.org',
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), allScripts);
  }

  _installDevDependencies() {
    this.npmInstall([ '@babel/core', '@babel/preset-env', 'del', 'gulp', 'gulp-babel', 'gulp-sass', 'sass', 'nunjucks' ], { 'save-dev': true });
  }

  install () {
    this._extendScripts();
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
