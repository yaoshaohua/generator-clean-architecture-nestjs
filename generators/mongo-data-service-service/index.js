const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const pluralize = require("pluralize");
const utils = require("../../utils/index.js");

const RELATIVE_PATH = 'src/frameworks/data-services/mongo/mongo-data-services.service.ts';
const MODULE_NAME = './model';

const PROPERTY_PATTERN = /implements IDataServices, OnApplicationBootstrap\s*\{([\s\S]*?)constructor\(/;
const CONSTRUCTOR_PATTERN = /constructor\(([\s\S]*?)\)\s*\{/;
const BOOTSTRAP_PATTERN = /onApplicationBootstrap\(\)\s*\{([\s\S]*?)\}\s*\n\s*}/;

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

    const filePath = this.destinationPath(RELATIVE_PATH);
    let fileContent = this.fs.read(filePath);

    // update import model
    fileContent = utils.updateImport(fileContent, MODULE_NAME, `\n  ${pascalCaseName},\n  ${pascalCaseName}Document\n`);

    // update property
    const newProperty = `  ${pluralName}: MongoGenericRepository<${pascalCaseName}>;\n`;
    fileContent = utils.updatePattern(fileContent, PROPERTY_PATTERN, newProperty);

    // update constructor
    const newInject = `\n    @InjectModel(${pascalCaseName}.name)\n    private ${pascalCaseName}Repository: Model<${pascalCaseName}Document>,\n`;
    fileContent = utils.updatePattern(fileContent, CONSTRUCTOR_PATTERN, newInject);

    // update bootstrap
    const newBootstrapDefine = `    this.${pluralName} = new MongoGenericRepository<${pascalCaseName}>(this.${pascalCaseName}Repository);`;
    fileContent = utils.updatePattern(fileContent, BOOTSTRAP_PATTERN, newBootstrapDefine);

    this.fs.write(filePath, fileContent);
  }
};
