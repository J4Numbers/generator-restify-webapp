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
        'test': 'npm run test:mocha',
        'test:mocha': 'NODE_ENV=test nyc --all mocha --config tests/.mocharc.js'
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), allScripts);
  }

  _installDevDependencies() {
    this.npmInstall([ 'chai', 'chai-as-promised', 'chai-http', 'clear-require', 'import-fresh', 'mocha', 'mock-require', 'nyc', 'sinon', 'sinon-chai', 'zombie' ], { 'save-dev': true });
  }

  install () {
    this._extendScripts();
    this._installDevDependencies();
  }

  _moveAllFiles () {
    this.fs.copyTpl(
        this.templatePath('./**/*'),
        this.destinationPath('./'),
        this.setup, {},
        { globOptions: { dot: true } },
    );
  }

  shiftFiles () {
    this._moveAllFiles();
  }

};
