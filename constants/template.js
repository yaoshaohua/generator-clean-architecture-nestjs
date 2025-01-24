const pascalCaseSuffixes = {
  SCHEMA: 'Schema',
  DOCUMENT: 'Document',
  REPOSITORY: 'Repository',
  USE_CASES_MODULE: 'UseCasesModule',
  CONTROLLER: 'Controller',
}

module.exports = {
  TEMPLATE_IDATASERVICES_ABSTRACT_CLASS(pluralName, pascalCaseName) {
    return `abstract ${pluralName}: IGenericRepository<${pascalCaseName}>;`
  },

  TEMPLATE_MONGOOSEMODULE_FORFEATURE_MODELS(pascalCaseName) {
    return `\n      { name: ${pascalCaseName}.name, schema: ${this.getSchemaName(pascalCaseName)} },`
  },

  TEMPLATE_MONGODATASERVICES_CLASS_UNTIL_CONSTRUCTOR(pluralName, pascalCaseName) {
    return `${pluralName}: MongoGenericRepository<${pascalCaseName}>;`
  },
  TEMPLATE_MONGODATASERVICES_CONSTRUCTOR_PARAMETERS(pascalCaseName) {
    return `@InjectModel(${pascalCaseName}.name)\nprivate ${this.getRepositoryName(pascalCaseName)}: Model<${this.getDocumentName(pascalCaseName)}>,`
  },
  TEMPLATE_MONGODATASERVICES_ONAPPLICATIONBOOTSTRAP_IMPLEMENTATION(pluralName, pascalCaseName) {
    return `this.${pluralName} = new MongoGenericRepository<${pascalCaseName}>(this.${this.getRepositoryName(pascalCaseName)});`
  },

  TEMPLATE_USE_CASE_IMPORT(name, pascalCaseName) {
    return `import { ${this.getUseCasesModuleName(pascalCaseName)} } from '@use-cases/${name}/${name}.use-cases.module';`
  },

  TEMPLATE_MODULE_IMPORTS(pascalCaseName) {
    return `\n    ${this.getUseCasesModuleName(pascalCaseName)},`
  },
  TEMPLATE_MODULE_CONTROLLERS(pascalCaseName) {
    return `\n    ${this.getControllerName(pascalCaseName)}`
  },
  TEMPLATE_CONTROLLER_IMPORT(pascalCaseName) {
    return [`${this.getControllerName(pascalCaseName)}`]
  },

  TEMPLATE_SCHEMA_IMPORT(pascalCaseName) {
    return [`${pascalCaseName}`, `${this.getSchemaName(pascalCaseName)}`]
  },

  TEMPLATE_DOCUMENT_IMPORT(pascalCaseName) {
    return [`${pascalCaseName}`, `${this.getDocumentName(pascalCaseName)}`]
  },

  // Helper methods
  getSchemaName: pascalCaseName => `${pascalCaseName}${pascalCaseSuffixes.SCHEMA}`,
  getDocumentName: pascalCaseName => `${pascalCaseName}${pascalCaseSuffixes.DOCUMENT}`,
  getRepositoryName: pascalCaseName => `${pascalCaseName}${pascalCaseSuffixes.REPOSITORY}`,
  getUseCasesModuleName: pascalCaseName => `${pascalCaseName}${pascalCaseSuffixes.USE_CASES_MODULE}`,
  getControllerName: pascalCaseName => `${pascalCaseName}${pascalCaseSuffixes.CONTROLLER}`
}
