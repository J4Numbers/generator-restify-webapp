const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.setup = opts;
  }

  _moveStaticFiles () {
    this.fs.copyTpl(
        this.templatePath('./src/**/*'),
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

  shiftFiles () {
    this._moveStaticFiles();
  }

};
