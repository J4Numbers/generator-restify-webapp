const fs = require('fs');
const path = require('path');

describe('controller: Application generator', function () {
  it('Should generate a package json file with 9 scripts', function () {
    return yHelpers.run(path.join(__dirname, '../../../../generators/app'))
      .withPrompts({
        app_name: 'test-build',
        base_engine: 'none',
      })
      .then((result) => {
        expect(fs.readdirSync(result)).to.contain('package.json');
        const file = JSON.parse(fs.readFileSync(path.resolve(result, 'package.json')).toString('utf-8'));
        expect(file).to.haveOwnProperty('scripts');
        expect(Object.keys(file.scripts)).to.have.length(9);
      });
  });
});
