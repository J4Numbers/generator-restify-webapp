const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  gulpSources;

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

  _loadBasePrototypeSources () {
    this.gulpSources = {
      babel: {
        src: [ 'src/javascript/**/*.js' ],
      },
      fonts: {
        src: [],
      },
      images: {
        src: [],
      },
      scripts: {
        src: [],
      },
      styles: {
        src: [ 'src/stylesheets/**/*.scss' ],
      },
    };
  }

  _testGovukFramework () {
    if (this.setup.base_engine === 'GovUK') {
      this.npmInstall([ 'govuk-frontend' ], { save: true });
      this.gulpSources.fonts.src.push('node_modules/govuk-frontend/govuk/assets/fonts/**/*');
      this.gulpSources.images.src.push('node_modules/govuk-frontend/govuk/assets/images/**/*');
      this.gulpSources.scripts.src.push('node_modules/govuk-frontend/govuk/*.js');
      this.gulpSources.styles.src.push('node_modules/govuk-frontend/govuk/*.scss');
    }
  }

  _extendGulpSources () {
    this.fs.extendJSON(this.destinationPath('gulp-sources.json'), this.gulpSources);
  }

  _installDependencies () {
    this.npmInstall([ 'bunyan', 'config' ], { save: true });
  }

  install () {
    this._extendScripts();
    this._loadBasePrototypeSources();
    this._testGovukFramework();
    this._extendGulpSources();
    this._installDependencies();
  }

  _moveStaticFiles () {
    this.fs.copyTpl(
        this.templatePath('./config/**/*'),
        this.destinationPath('./config/'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
    this.fs.copyTpl(
        this.templatePath('./src/javascript/**/*'),
        this.destinationPath('./src/javascript/'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
    this.fs.copyTpl(
        this.templatePath('./src/server/**/*'),
        this.destinationPath('./src/server/'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
    this.fs.copyTpl(
        this.templatePath('./src/stylesheets/**/*'),
        this.destinationPath('./src/stylesheets/'),
        this.setup,
        {},
        { globOptions: { dot: true } },
    );
    if (this.setup.base_engine === 'GovUK') {
      this.fs.copyTpl(
          this.templatePath('./src/views/govuk/**/*'),
          this.destinationPath('./src/views/'),
          this.setup,
          {},
          { globOptions: { dot: true } },
      );
    } else {
      this.fs.copyTpl(
          this.templatePath('./src/views/base/**/*'),
          this.destinationPath('./src/views/'),
          this.setup,
          {},
          { globOptions: { dot: true } },
      );
    }
  }

  shiftFiles () {
    this._moveStaticFiles();
  }

};
