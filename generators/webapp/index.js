const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
  }

  _moveStaticFiles () {
    this.fs.copy(
        this.templatePath('./src/**/*.js'),
        this.destinationPath('./src'),
    );
    this.fs.copy(
        this.templatePath('./test/**/*.js'),
        this.destinationPath('./test'),
    );
  }

  _moveConfigurableFiles () {
    this.fs.copyTpl(
        this.templatePath('./config/default.js'),
        this.destinationPath('./config/default.js'),
        { app_name: this.setup.app_name },
    );
    this.fs.copyTpl(
        this.templatePath('./config/test.js'),
        this.destinationPath('./config/test.js'),
    );
    this.fs.copyTpl(
        this.templatePath('./config/custom-environment-variables.js'),
        this.destinationPath('./config/custom-environment-variables.js'),
    );
  }

  shiftFiles () {
    this._moveStaticFiles();
    this._moveConfigurableFiles();
  }

};
