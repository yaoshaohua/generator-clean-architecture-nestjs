const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");

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
          message: "Please enter the controller name:",
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

    this.fs.copyTpl(
      this.templatePath('controller.ts.ejs'),
      this.destinationPath(`src/controllers/${name}.controller.ts`),
      { name, pascalCaseName }
    );
    this.fs.append(
      this.destinationPath(`src/controllers/index.ts`),
      `export * from './${name}.controller';\n`
    );
  }
};
