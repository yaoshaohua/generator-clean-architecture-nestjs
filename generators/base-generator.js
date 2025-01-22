const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");

module.exports = class BaseGenerator extends Generator {
  constructor(args, opts, config) {
    super(args, opts);
    this.argument("name", { type: String });
    this.options = opts;
    this.config = config;
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
          message: `Please enter the ${this.config.fileSuffix} name:`,
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

    const { rootDir, fileSuffix } = this.config;
    const fileName = `${name}.${fileSuffix}.ts`;

    // Generate new file from template
    this.fs.copyTpl(
      this.templatePath(`${fileSuffix}.ts.ejs`),
      this.destinationPath(`${rootDir}/${fileName}`),
      { name, pascalCaseName }
    );

    // Append export statement to index.ts
    this.fs.append(
      this.destinationPath(`${rootDir}/index.ts`),
      `export * from './${fileName.replace(/\.ts$/, '')}';\n`
    );
  }
};
