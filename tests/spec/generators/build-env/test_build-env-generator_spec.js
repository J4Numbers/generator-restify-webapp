const fs = require('fs');
const path = require('path');

describe('build: Build environment generator', function () {
  const runBuildEnvGenerator = () => yHelpers
    .run(path.join(__dirname, '../../../../generators/build-env'))
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
        expect(Object.keys(file.scripts)).to.have.length(6);
      });
  });

  it('Should generate ignore files for git and docker', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        const fileList = fs.readdirSync(result);
        expect(fileList).to.contain('.gitignore');
        expect(fileList).to.contain('.dockerignore');
      });
  });

  it('Should generate a Dockerfile', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        const fileList = fs.readdirSync(result);
        expect(fileList).to.contain('Dockerfile');
      });
  });

  it('Should generate a Gulpfile', function () {
    return runBuildEnvGenerator()
    .then((result) => {
      const fileList = fs.readdirSync(result);
      expect(fileList).to.contain('gulpfile.js');
    });
  });

  it('Should generate a compilation script for templates which is unedited from the template', function () {
    return runBuildEnvGenerator()
    .then((result) => {
      expect(fs.readdirSync(result)).to.contain('bin');
      expect(fs.readdirSync(path.resolve(result, 'bin'))).to.contain('compile.js');

      const sourceFile = fs.readFileSync(
        path.join(__dirname, '../../../../generators/build-env/templates/bin/compile.js'),
        { encoding: 'utf-8' },
      );
      const deployedFile = fs.readFileSync(
          path.join(result, 'bin/compile.js'),
          { encoding: 'utf-8' },
      );
      expect(deployedFile).to.equal(sourceFile);
    });
  });

  it('Should generate an empty certificates directory', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('certs');
        expect(fs.readdirSync(path.resolve(result, 'certs'))).to.have.length(1);
        expect(fs.readdirSync(path.resolve(result, 'certs'))).to.contain('.gitignore');
      });
  });

  it('Should generate a configuration folder with the compilation configuration', function () {
    return runBuildEnvGenerator()
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('config');
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.have.length(1);
        expect(fs.readdirSync(path.resolve(result, 'config'))).to.contain('compile.config.js');
      });
  });
});
