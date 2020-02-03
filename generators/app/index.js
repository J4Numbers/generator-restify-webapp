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

  reportParams () {
    console.log(this.setup);
  }
};
