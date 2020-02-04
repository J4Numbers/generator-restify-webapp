const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
  }

  async prompting () {
    this.setup = await this.prompt([
      {
        type: 'input',
        name: 'project_name',
        message: 'What is the name of your project?',
      },
      {
        type: 'confirm',
        name: 'enable_http2',
        message: 'Do you want to enable HTTP/2?',
      },
      {
        type: 'confirm',
        name: 'enable_rendering',
        message: 'Will you be rendering any HTML?',
      },
    ]);
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
    this.fs.extendJSON(this.destinationPath('package.json', allScripts));
  }

  _installDependencies () {
    this.npmInstall([ 'bunyan', 'config', 'restify', 'restify-errors', 'uuid' ], { save: true });
  }

  _installDevDependencies() {
    this.npmInstall([ '@dwp/eslint-config-base', '@dwp/eslint-config-mocha', 'chai', 'chai-as-promised', 'chai-http', 'clear-require', 'eslint', 'import-fresh', 'mocha', 'mock-require', 'nyc', 'sinon', 'sinon-chai' ], { 'save-dev': true });
  }

  install () {
    this._installDependencies();
    this._installDevDependencies();
  }

  _moveConfigs () {
    this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore'),
    )
  }

  shiftFiles () {}

  reportParams () {
    console.log(this.setup);
  }
};
