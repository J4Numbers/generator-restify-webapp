const Browser = require('zombie');
const testConfig = require('config');

const baseLink = `http://${testConfig.get('app.hostname')}:${testConfig.get('app.port')}`;

describe('The homepage journey', function () {
  const browser = new Browser();

  before(async function () {
    await refreshPage(browser, baseLink);
  });

  it('Should render the page immediately', function () {
    return refreshPage(browser, baseLink)
      .then(() => browser.assert.success());
  });

  it('Should display hello world on the home page', function () {
    return refreshPage(browser, baseLink)
      .then(() => browser.assert.text('h1', 'Hello world!'));
  })
});
