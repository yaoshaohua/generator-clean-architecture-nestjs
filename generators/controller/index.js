const BaseGenerator = require("../base-generator");
const { PATH_CONSTANTS, SUFFIX_CONSTANTS } = require("../../constants");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: PATH_CONSTANTS.CONTROLLERS_DIR,
      fileSuffix: SUFFIX_CONSTANTS.CONTROLLER
    });
  }

  writing() {
    super.writing();
  }
};
