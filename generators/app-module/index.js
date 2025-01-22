const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const utils = require("../../utils/index.js");

const RELATIVE_PATH = 'src/app.module.ts';
const MODULE_NAME = '@controllers/index';

const USE_CASE_IMPORT_PATTERN = /import\s*{[^}]*}\s*from\s*['"][^'"]*['"];/g;
const IMPORTS_PATTERN = /imports:\s*\[\s*([\s\S]*?)\s*\],/;
const controllers_PATTERN = /controllers:\s*\[\s*([\s\S]*?)\s*\],/;

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

    fileContent = utils.updatePattern(fileContent, USE_CASE_IMPORT_PATTERN, `import { ${pascalCaseName}UseCasesModule } from './${name}/${name}.use-cases.module';`);

    // update import controller
    fileContent = utils.updateImport(fileContent, MODULE_NAME, `\n  ${pascalCaseName}Controller\n`);

    // update imports
    fileContent = utils.updatePattern(fileContent, IMPORTS_PATTERN, `\n    ${pascalCaseName}UseCasesModule,`);

    // update controllers
    fileContent = utils.updatePattern(fileContent, controllers_PATTERN, `\n    ${pascalCaseName}Controller,`);

    this.fs.write(filePath, fileContent);
  }
};
