const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const utils = require("../../utils/index.js");
const { PATH_CONSTANTS, REGEXP_CONSTANTS } = require("../../constants");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String });
  }

  initializing() {
    this.conflicter.force = true;
  }

  prompting() {
    if (!this.options.name) {
      return this.prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter the module name:",
          default: "test"
        }
      ]).then(props => {
        this.options.name = props.name;
      });
    }
    return Promise.resolve();
  }

  writing() {
    const { name } = this.options;
    const pascalCaseName = pascalCase(name);

    const filePath = this.destinationPath(PATH_CONSTANTS.MONGO_DATA_SERVICES_MODULE_PATH);
    let fileContent = this.fs.read(filePath);

    // update import model
    fileContent = utils.updateImport(fileContent, PATH_CONSTANTS.MODEL_RELATIVE_PATH, `\n  ${pascalCaseName},\n  ${pascalCaseName}Schema\n`);

    // update MongooseModule.forFeature
    const newForFeatureStatement = `\n      { name: ${pascalCaseName}.name, schema: ${pascalCaseName}Schema },`;
    fileContent = utils.updatePattern(fileContent, REGEXP_CONSTANTS.REGEX_MONGOOSEMODULE_FORFEATURE_MODELS, newForFeatureStatement);

    this.fs.write(filePath, fileContent);
  }
};
