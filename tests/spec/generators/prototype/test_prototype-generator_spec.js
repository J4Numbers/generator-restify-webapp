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

  it('Should extend the gulpfile sources file with normal prototype areas', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        const fileList = fs.readdirSync(result);
        expect(fileList).to.contain('gulp-sources.json');
        const readFile = JSON.parse(
            fs.readFileSync(path.resolve(result, 'gulp-sources.json')).toString('utf-8'),
        );

        expect(Object.keys(readFile)).to.have.length(5);
        expect(readFile).to.haveOwnProperty('babel');
        expect(readFile.babel.src).to.have.length(1);
        expect(readFile).to.haveOwnProperty('fonts');
        expect(readFile.fonts.src).to.have.length(0);
        expect(readFile).to.haveOwnProperty('images');
        expect(readFile.images.src).to.have.length(0);
        expect(readFile).to.haveOwnProperty('scripts');
        expect(readFile.scripts.src).to.have.length(0);
        expect(readFile).to.haveOwnProperty('styles');
        expect(readFile.styles.src).to.have.length(1);
      });
  });

  it('Should extend the gulpfile sources file with GovUK prototype areas when using that framework', function () {
    return yHelpers
      .run(path.join(__dirname, '../../../../generators/prototype'))
      .withOptions({
        app_name: 'test-build',
        base_engine: 'GovUK',
      })
      .then((result) => {
        const fileList = fs.readdirSync(result);
        expect(fileList).to.contain('gulp-sources.json');
        const readFile = JSON.parse(
            fs.readFileSync(path.resolve(result, 'gulp-sources.json')).toString('utf-8'),
        );

        expect(Object.keys(readFile)).to.have.length(5);
        expect(readFile).to.haveOwnProperty('babel');
        expect(readFile.babel.src).to.have.length(1);
        expect(readFile).to.haveOwnProperty('fonts');
        expect(readFile.fonts.src).to.have.length(1);
        expect(readFile).to.haveOwnProperty('images');
        expect(readFile.images.src).to.have.length(1);
        expect(readFile).to.haveOwnProperty('scripts');
        expect(readFile.scripts.src).to.have.length(1);
        expect(readFile).to.haveOwnProperty('styles');
        expect(readFile.styles.src).to.have.length(2);
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

  it('should generate a simple view by default', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('src');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('views');
        expect(fs.readdirSync(path.resolve(result, 'src/views'))).to.contain('index.njk');

        const expectedFile = fs.readFileSync(
          path.resolve(__dirname, '../../../../generators/prototype/templates/src/views/base/index.njk'),
        ).toString('utf-8');
        const discoveredFile = fs.readFileSync(
            path.resolve(result, 'src/views/index.njk')
        ).toString('utf-8');
        expect(discoveredFile).to.equal(expectedFile);
      });
  });

  it('should generate a more complex GovUK view with that build engine', function () {
    return yHelpers
      .run(path.join(__dirname, '../../../../generators/prototype'))
      .withOptions({
        app_name: 'test-build',
        base_engine: 'GovUK',
      })
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('src');
        expect(fs.readdirSync(path.resolve(result, 'src'))).to.contain('views');
        expect(fs.readdirSync(path.resolve(result, 'src/views'))).to.contain('index.njk');

        const expectedFile = fs.readFileSync(
            path.resolve(__dirname, '../../../../generators/prototype/templates/src/views/govuk/index.njk'),
        ).toString('utf-8');
        const discoveredFile = fs.readFileSync(
            path.resolve(result, 'src/views/index.njk')
        ).toString('utf-8');
        expect(discoveredFile).to.equal(expectedFile);
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
