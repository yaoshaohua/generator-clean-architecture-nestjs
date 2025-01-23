const pathConstants = require('./path');
const regexpConstants = require('./regexp');
const suffixConstants = require('./suffix');
const separatorConstants = require('./separator');
const templateConstants = require('./template');

module.exports = {
  PATH_CONSTANTS: {
    ...pathConstants,
  },
  REGEXP_CONSTANTS: {
    ...regexpConstants,
  },
  SUFFIX_CONSTANTS: {
    ...suffixConstants,
  },
  SEPARATOR_CONSTANTS: {
    ...separatorConstants,
  },
  TEMPLATE_CONSTANTS: {
    ...templateConstants,
  },
};
