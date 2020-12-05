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
        name: 'app_name',
        message: 'What is the name of your project?',
      },
      {
        type: 'list',
        name: 'base_engine',
        message: 'Which rendering templates would you like to use?',
        choices: [
            'GovUK',
            'Bootstrap',
            'None',
        ],
      },
    ]);
  }

  configuring () {
    this.composeWith(require.resolve('../build-env'), this.setup);
    this.composeWith(require.resolve('../webapp'), this.setup);
  }
};
