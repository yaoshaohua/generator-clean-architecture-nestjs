module.exports = {
  IDATASERVICES_PROPERTY_TEMPLATE: (pluralName, pascalCaseName) => `  abstract ${pluralName}: IGenericRepository<${pascalCaseName}>;\n`,

  IMPORT_USE_CASE_TEMPLATE: (name, pascalCaseName) => `import { ${pascalCaseName}UseCasesModule } from '@use-cases/${name}/${name}.use-cases.module';`,
  MODULE_IMPORTS_TEMPLATE: pascalCaseName => `\n    ${pascalCaseName}UseCasesModule,`,

  IMPORT_CONTROLLER_TEMPLATE: pascalCaseName => `\n  ${pascalCaseName}Controller\n`,
  MODULE_CONTROLLERS_TEMPLATE: pascalCaseName => `\n    ${pascalCaseName}Controller`,
}
