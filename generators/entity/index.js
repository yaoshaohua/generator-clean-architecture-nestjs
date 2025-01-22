const BaseGenerator = require("../base-generator");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: 'src/core/entities',
      fileSuffix: 'entity'
    });
  }

  writing() {
    super.writing();
  }
};
