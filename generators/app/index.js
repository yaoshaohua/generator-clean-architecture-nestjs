const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

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

    this.composeWith(require.resolve("../app-module"), { name });
    this.composeWith(require.resolve("../controller"), { name });
    this.composeWith(require.resolve("../dto"), { name });
    this.composeWith(require.resolve("../entity"), { name });
    this.composeWith(require.resolve("../model"), { name });
    this.composeWith(require.resolve("../mongo-data-service-module"), { name });
    this.composeWith(require.resolve("../mongo-data-service-service"), { name });
    this.composeWith(require.resolve("../use-case"), { name });
  }
};
