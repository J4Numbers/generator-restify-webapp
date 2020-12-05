const fs = require('fs');
const path = require('path');

describe('build: Tests framework generator', function () {
  const runBuildEnvGenerator = () => yHelpers
    .run(path.join(__dirname, '../../../../generators/tests'))
    .withOptions({
      app_name: 'test-build',
      base_engine: 'none',
    });

  it('Should generate a package json file with several pre-set scripts', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('package.json');
        const file = JSON.parse(fs.readFileSync(path.resolve(result, 'package.json')).toString('utf-8'));
        expect(file).to.haveOwnProperty('scripts');
        expect(Object.keys(file.scripts)).to.have.length(2);
      });
  });

  it('Should generate a new nyc configuration file', function () {
    return runBuildEnvGenerator()
    .then((result) => {
      expect(fs.readdirSync(result)).to.contain('.nycrc');
    });
  });

  it('Should generate a configuration folder with the test configuration', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('config');
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.have.length(1);
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.contain('test.js');
      });
  });

  it('Should generate a mocharc options file', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('tests');
        expect(fs.readdirSync(path.resolve(result, 'tests'))).to.contain('.mocharc.js');
      });
  });

  it('Should include the three helper scripts', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('tests');
        expect(fs.readdirSync(path.resolve(result, 'tests'))).to.contain('spec');
        expect(fs.readdirSync(path.resolve(result, 'tests/spec'))).to.contain('helpers');

        expect(fs.readdirSync(path.resolve(result, 'tests/spec/helpers'))).to.have.length(3);
        expect(fs.readdirSync(path.resolve(result, 'tests/spec/helpers'))).to.contain('setup.js');
        expect(fs.readdirSync(path.resolve(result, 'tests/spec/helpers'))).to.contain('server-setup.js');
        expect(fs.readdirSync(path.resolve(result, 'tests/spec/helpers'))).to.contain('run-server.js');
      });
  });

  it('Should generate some test files', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('tests');
        expect(fs.readdirSync(path.resolve(result, 'tests'))).to.contain('spec');
        expect(fs.readdirSync(path.resolve(result, 'tests/spec'))).to.contain('app');

        expect(fs.readdirSync(path.resolve(result, 'tests/spec/helpers')).length).to.be.at.least(1);
      });
  });
});
