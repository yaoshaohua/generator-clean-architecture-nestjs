const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { pascalCase } = require("change-case");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the solid ${chalk.red(
          "generator-clean-architecture-nestjs"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Please enter the module name:",
        default: "test"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { name } = this.props;
    const pascalCaseName = pascalCase(name);

    this.composeWith(require.resolve("../controllers"), { name });
    // this.composeWith(require.resolve("../core"), { name });
    // this.composeWith(require.resolve("../data-services"), { name });
    // this.composeWith(require.resolve("../use-cases"), { name });
    // this.composeWith(require.resolve("../app-module"), { name });
  }
};
