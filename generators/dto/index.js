const BaseGenerator = require("../base-generator");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: 'src/core/dtos',
      fileSuffix: 'dto'
    });
  }

  writing() {
    super.writing();
  }
};
