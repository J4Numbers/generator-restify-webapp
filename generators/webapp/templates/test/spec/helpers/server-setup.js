process.env.ALLOW_CONFIG_MUTATIONS = 'true';
process.env.NODE_CONFIG = JSON.stringify(require('../../../config/test'));

const testConfig = importFresh('config');

expect(
    testConfig.get('app.http2.enabled'),
    'HTTP2 should be disabled'
).to.equal(false);

startMockRequire('config', testConfig);

global.server = () => require('../../../src/server/app');

