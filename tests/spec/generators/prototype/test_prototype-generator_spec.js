const fs = require('fs');
const path = require('path');

describe('build: Prototype framework generator', function () {
  const runBuildEnvGenerator = () => yHelpers
    .run(path.join(__dirname, '../../../../generators/prototype'))
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
        expect(Object.keys(file.scripts)).to.have.length(1);
      });
  });

  it('Should generate a package json file with a main file', function () {
    return runBuildEnvGenerator()
    .then((result) => {
      expect(fs.readdirSync(result)).to.contain('package.json');
      const file = JSON.parse(fs.readFileSync(path.resolve(result, 'package.json')).toString('utf-8'));
      expect(file).to.haveOwnProperty('main');
      expect(file.main).to.equal('src/server/app.js');
    });
  });

  it('Should generate a configuration folder with the default configuration', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('config');
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.have.length(3);
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.contain('.gitignore');
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.contain('default.js');
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.contain('custom-environment-variables.js');

        expect(
            fs.readFileSync(path.resolve(result, 'config/default.js')).toString('utf-8'),
        ).to.contain('test-build');
      });
  });

  it('Should generate a prototype framework directory structure in the source files', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('src');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.have.length(4);
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('javascript');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('stylesheets');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('views');
      });
  });

  it('Should move the simple bouncing server into the source folder', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('src');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('server');
        expect(fs.readdirSync(path.resolve(result, 'src/server'))).to.contain('app.js');

        const templateFile = fs.readFileSync(
          path.resolve(__dirname, '../../../../generators/prototype/templates/src/server/app.js'),
          { encoding: 'utf-8' },
        );
        const movedFile = fs.readFileSync(
          path.resolve(result, 'src/server/app.js'),
          { encoding: 'utf-8' },
        );
        expect(movedFile).to.equal(templateFile);
      });
  });
});
