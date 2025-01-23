const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const pluralize = require("pluralize");
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
          message: "Please enter the service name:",
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

    const filePath = this.destinationPath(PATH_CONSTANTS.MONGO_DATA_SERVICES_SERVICE_PATH);
    let fileContent = this.fs.read(filePath);

    // update import model
    fileContent = utils.updateImport(fileContent, PATH_CONSTANTS.MODEL_RELATIVE_PATH, `\n  ${pascalCaseName},\n  ${pascalCaseName}Document\n`);

    // update property
    const newProperty = `  ${pluralName}: MongoGenericRepository<${pascalCaseName}>;\n`;
    fileContent = utils.updatePattern(fileContent, REGEXP_CONSTANTS.REGEX_MONGODATASERVICES_CLASS_UNTIL_CONSTRUCTOR, newProperty);

    // update constructor
    const newInject = `\n    @InjectModel(${pascalCaseName}.name)\n    private ${pascalCaseName}Repository: Model<${pascalCaseName}Document>,\n`;
    fileContent = utils.updatePattern(fileContent, REGEXP_CONSTANTS.REGEX_MONGODATASERVICES_CONSTRUCTOR_PARAMETERS, newInject);

    // update bootstrap
    const newBootstrapDefine = `    this.${pluralName} = new MongoGenericRepository<${pascalCaseName}>(this.${pascalCaseName}Repository);`;
    fileContent = utils.updatePattern(fileContent, REGEXP_CONSTANTS.REGEX_MONGODATASERVICES_ONAPPLICATIONBOOTSTRAP_IMPLEMENTATION, newBootstrapDefine);

    this.fs.write(filePath, fileContent);
  }
};
