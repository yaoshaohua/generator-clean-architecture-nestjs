const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const pluralize = require("pluralize");
const utils = require(path.resolve(__dirname, '../../utils/index.js'));
const {
  PATH_CONSTANTS,
  REGEXP_CONSTANTS,
  SEPARATOR_CONSTANTS,
  TEMPLATE_CONSTANTS
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
          message: "Please enter the abstract name:",
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
    const pluralName = pluralize(name);

    const filePath = this.destinationPath(PATH_CONSTANTS.DATA_SERVICES_ABSTRACT_PATH);

    utils.chainFileOperations(this.fs, filePath)
      .read()
      .appendToImport(PATH_CONSTANTS.ENTITIES_RELATIVE_PATH, pascalCaseName)
      .appendToMatchWithSeparator(
        REGEXP_CONSTANTS.REGEX_IDATASERVICES_ABSTRACT_CLASS,
        TEMPLATE_CONSTANTS.TEMPLATE_IDATASERVICES_ABSTRACT_CLASS(pluralName, pascalCaseName),
        SEPARATOR_CONSTANTS.SEPARATOR_SEMICOLON
      )
      .write();
  }
};
