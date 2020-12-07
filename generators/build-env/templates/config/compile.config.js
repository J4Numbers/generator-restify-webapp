const metaPackage = require('../package.json');

module.exports = {
<% if (base_engine === 'GovUK') { -%>
  banner: {
    phrase: 'Internal',
  },
<% } -%>
  base_path: '',
  metadata: metaPackage,
};
