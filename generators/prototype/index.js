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
        'run:dev': 'node src/server/app.js',
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), allScripts);
  }

  _installDependencies () {
    this.npmInstall([ 'bunyan', 'config' ], { save: true });
  }

  install () {
    this._extendScripts();
    this._installDependencies();
  }

  _moveStaticFiles () {
    this.fs.copyTpl(
        this.templatePath('./**/*'),
        this.destinationPath('./'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
  }

  shiftFiles () {
    this._moveStaticFiles();
  }

};
