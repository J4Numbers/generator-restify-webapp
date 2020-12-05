/* eslint-disable import/no-dynamic-require,global-require */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

process.env.NODE_ENV = 'test';

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(sinonChai);

// Globals
global.sinon = require('sinon');

global.expect = chai.expect;
global.request = chai.request;

global.importFresh = (module) => require('import-fresh')(module);

global.clearRequire = (module) => require('clear-require')(module);

global.startMockRequire = (module, replacement) => require('mock-require')(module, replacement);

global.stopMockRequire = (module) => require('mock-require').stop(module);

global.refreshPage = async (browser, visitPath) => {
  await browser.visit(visitPath);
}
