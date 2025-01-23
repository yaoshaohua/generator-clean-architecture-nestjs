const BaseGenerator = require("../base-generator");
const { PATH_CONSTANTS, SUFFIX_CONSTANTS } = require("../../constants");
module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: PATH_CONSTANTS.DTOS_DIR,
      fileSuffix: SUFFIX_CONSTANTS.DTO
    });
  }

  writing() {
    super.writing();
  }
};
