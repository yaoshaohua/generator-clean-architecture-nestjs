const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");
const fs = require("fs");
const { mkdirSync } = fs;
const { PATH_CONSTANTS } = require("../../constants");

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
          message: "Please enter the use-case name:",
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

    const useCasesFolderPath = this.destinationPath(`${PATH_CONSTANTS.USE_CASES_DIR}/${name}`);
    mkdirSync(useCasesFolderPath, { recursive: true });

    const copyTemplate = (templateFile, destinationFile) => {
      this.fs.copyTpl(
        this.templatePath(templateFile),
        this.destinationPath(`${useCasesFolderPath}/${destinationFile}`),
        { name, pascalCaseName }
      );
    };

    copyTemplate('use-case.ts.ejs', `${name}.use-case.ts`);
    copyTemplate('use-cases.module.ts.ejs', `${name}-use-cases.module.ts`);
    copyTemplate('use-cases.index.ts.ejs', `index.ts`);
  }
};
