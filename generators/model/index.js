const BaseGenerator = require("../base-generator");

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts, {
      rootDir: 'src/frameworks/data-services/mongo/model',
      fileSuffix: 'model'
    });
  }

  writing() {
    super.writing();
  }
};
