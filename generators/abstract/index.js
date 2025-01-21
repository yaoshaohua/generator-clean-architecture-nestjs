const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const pluralize = require("pluralize");
const utils = require("../../utils/index.js");

const RELATIVE_PATH = 'src/core/abstracts/data-services.abstract.ts';
const MODULE_NAME = '../entities';

const ABSTRACT_CLASS_PATTERN = /export\s+abstract\s+class\s+IDataServices\s*\{([\s\S]*?)\}/;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: false });
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

    const filePath = this.destinationPath(RELATIVE_PATH);
    let fileContent = this.fs.read(filePath);

    // update import entity
    fileContent = utils.updateImport(fileContent, MODULE_NAME, pascalCaseName);

    // update abstract class
    const newAbstractProperty = `  abstract ${pluralName}: IGenericRepository<${pascalCaseName}>;\n`;
    fileContent = fileContent.replace(ABSTRACT_CLASS_PATTERN, (match, p1) => {
      return match.replace(p1, p1 + newAbstractProperty);
    });

    this.fs.write(filePath, fileContent);
  }
};
