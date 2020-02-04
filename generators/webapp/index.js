const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.setup = opts;
  }

  _moveStaticFiles () {
    this.fs.copyTpl(
        this.templatePath('./src/**/*.js'),
        this.destinationPath('./src'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
    this.fs.copyTpl(
        this.templatePath('./test/**/*.js'),
        this.destinationPath('./test'),
        this.setup, {},
        { globOptions: { dot: true } },
    );
  }

  _moveConfigurableFiles () {
    this.fs.copyTpl(
        this.templatePath('./config/default.js'),
        this.destinationPath('./config/default.js'),
        this.setup,
    );
    this.fs.copyTpl(
        this.templatePath('./config/test.js'),
        this.destinationPath('./config/test.js'),
        this.setup,
    );
    this.fs.copyTpl(
        this.templatePath('./config/custom-environment-variables.js'),
        this.destinationPath('./config/custom-environment-variables.js'),
        this.setup,
    );
  }

  shiftFiles () {
    this._moveStaticFiles();
    this._moveConfigurableFiles();
  }

};
