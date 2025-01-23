const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const utils = require("../../utils/index.js");
const {
  PATH_CONSTANTS,
  REGEXP_CONSTANTS,
  TEMPLATE_CONSTANTS,
  SEPARATOR_CONSTANTS
} = require("../../constants");

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

    const filePath = this.destinationPath(PATH_CONSTANTS.APP_MODULE_PATH);

    utils.chainFileOperations(this.fs, filePath)
      .read()
      .appendToImport(PATH_CONSTANTS.CONTROLLERS_RELATIVE_PATH, TEMPLATE_CONSTANTS.IMPORT_CONTROLLER_TEMPLATE(pascalCaseName)) // import controller
      .insertNewImportStatement(TEMPLATE_CONSTANTS.IMPORT_USE_CASE_TEMPLATE(name, pascalCaseName)) // import use case
      .appendToMatchWithSeparator(
        REGEXP_CONSTANTS.REGEX_MODULE_IMPORTS,
        TEMPLATE_CONSTANTS.MODULE_IMPORTS_TEMPLATE(pascalCaseName),
        SEPARATOR_CONSTANTS.SEPARATOR_COMMA
      ) // update imports
      .appendToMatchWithSeparator(
        REGEXP_CONSTANTS.REGEX_MODULE_CONTROLLERS,
        TEMPLATE_CONSTANTS.MODULE_CONTROLLERS_TEMPLATE(pascalCaseName),
        SEPARATOR_CONSTANTS.SEPARATOR_COMMA
      ) // update controllers
      .write();
  }
};
