const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const utils = require("../../utils/index.js");

const RELATIVE_PATH = 'src/frameworks/data-services/mongo/mongo-data-services.module.ts';
const MODULE_NAME = './model';

const FOR_FEATURE_PATTERN = /MongooseModule\.forFeature\(\[\s*([\s\S]*?)\s*\]\)/;

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

    const filePath = this.destinationPath(RELATIVE_PATH);
    let fileContent = this.fs.read(filePath);

    // update import model
    fileContent = utils.updateImport(fileContent, MODULE_NAME, `\n  ${pascalCaseName},\n  ${pascalCaseName}Schema\n`);

    // update MongooseModule.forFeature
    const newForFeatureStatement = `\n      { name: ${pascalCaseName}.name, schema: ${pascalCaseName}Schema },`;
    fileContent = utils.updatePattern(fileContent, FOR_FEATURE_PATTERN, newForFeatureStatement);

    this.fs.write(filePath, fileContent);
  }
};
