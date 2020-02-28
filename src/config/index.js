const common = require('./common');
const _ = require('../utils/_');

let current;

switch (process.env.NODE_ENV) {
  case 'development': {
    current = require('./dev.js');
    break;
  }
  case 'test': {
    current = require('./test.js');
    break;
  }
  case 'production': {
    current = require('./prod.js');
    break;
  }
  default: {
    current = {};
    break;
  }
}

module.exports = _.deepAssign(common, current);
