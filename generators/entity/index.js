const BaseGenerator = require("../base-generator");
const { PATH_CONSTANTS } = require("../constants");
const { PATH_CONSTANTS, SUFFIX_CONSTANTS } = require("../../constants");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: PATH_CONSTANTS.ENTITIES_DIR,
      fileSuffix: SUFFIX_CONSTANTS.ENTITY
    });
  }

  writing() {
    super.writing();
  }
};
