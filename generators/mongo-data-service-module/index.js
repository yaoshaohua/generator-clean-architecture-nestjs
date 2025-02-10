const path = require('path');
const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const utils = require(path.resolve(__dirname, '../../utils/index.js'));
const {
  PATH_CONSTANTS,
  REGEXP_CONSTANTS,
  TEMPLATE_CONSTANTS,
  SEPARATOR_CONSTANTS
} = require(path.resolve(__dirname, '../../constants'));

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

    utils.chainFileOperations(this.fs, filePath)
      .read()
      .appendToImport(PATH_CONSTANTS.MODEL_RELATIVE_PATH, TEMPLATE_CONSTANTS.TEMPLATE_SCHEMA_IMPORT(pascalCaseName)) // import model
      .appendToMatchWithSeparator(
        REGEXP_CONSTANTS.REGEX_MONGOOSEMODULE_FORFEATURE_MODELS,
        TEMPLATE_CONSTANTS.TEMPLATE_MONGOOSEMODULE_FORFEATURE_MODELS(pascalCaseName),
        SEPARATOR_CONSTANTS.SEPARATOR_COMMA
      ) // update MongooseModule.forFeature
      .write();
  }
};
