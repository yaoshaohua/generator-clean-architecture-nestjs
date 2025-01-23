const BaseGenerator = require("../base-generator");
const { PATH_CONSTANTS, SUFFIX_CONSTANTS } = require("../../constants");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: PATH_CONSTANTS.MONGO_ADAPTER_DIR,
      fileSuffix: SUFFIX_CONSTANTS.MODEL
    });
  }

  writing() {
    super.writing();
  }
};
