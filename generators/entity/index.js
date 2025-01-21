const Generator = require("yeoman-generator");
const { pascalCase } = require("change-case");

const ROOT_DIR = 'src/core/entities';
const INDEX_FILE_PATH = `${ROOT_DIR}/index.ts`;

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
          message: "Please enter the entity name:",
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
      this.templatePath('entity.ts.ejs'),
      this.destinationPath(`${ROOT_DIR}/${name}.entity.ts`),
      { pascalCaseName }
    );
    this.fs.append(
      this.destinationPath(INDEX_FILE_PATH),
      `export * from './${name}.entity';\n`
    );
  }
};
