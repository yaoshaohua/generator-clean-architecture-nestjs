const Generator = require("yeoman-generator");
const path = require("path");
const chalk = require("chalk");
const yosay = require("yosay");
const { pascalCase } = require("change-case");
const fs = require("fs");
const { mkdirSync } = fs;

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
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

    // // src/controllers
    // this.fs.copyTpl(
    //   this.templatePath('controller.ts.ejs'),
    //   this.destinationPath(path.join('src', 'controllers', `${name}.controller.ts`)),
    //   { name, pascalCaseName }
    // );
    // this.fs.append(
    //   this.destinationPath(path.join('src', 'controllers', 'index.ts')),
    //   `export * from './${name}.controller';\n`,
    //   { conflict: 'force' }
    // );

    // // src/core/abstracts
    // const dataServicesAbstractPath = this.destinationPath(path.join('src', 'core', 'abstracts', 'data-services.abstract.ts'));
    // let dataServicesAbstractContent = this.fs.read(dataServicesAbstractPath);

    // const entitiesImportPattern = /import\s*{\s*([^}]+)\s*}\s*from\s*"\.\.\/entities";/;
    // const newEntitiesImportStatement = dataServicesAbstractContent.replace(entitiesImportPattern, (match, imports) => {
    //   return `import { ${imports}, ${pascalCaseName} } from "../entities";`;
    // });
    // dataServicesAbstractContent = newEntitiesImportStatement;

    // const abstractClassPattern = /export\s+abstract\s+class\s+IDataServices\s*\{([\s\S]*?)\}/;
    // const newAbstractProperty = `  abstract ${name}s: IGenericRepository<${pascalCaseName}>;\n`;
    // dataServicesAbstractContent = dataServicesAbstractContent.replace(abstractClassPattern, (match, p1) => {
    //   return match.replace(p1, p1 + newAbstractProperty);
    // });

    // this.fs.write(dataServicesAbstractPath, dataServicesAbstractContent);

    // // src/core/dtos
    // this.fs.copyTpl(
    //   this.templatePath('dto.ts.ejs'),
    //   this.destinationPath(path.join('src', 'core', 'dtos', `${name}.dto.ts`)),
    //   { pascalCaseName }
    // );
    // this.fs.append(
    //   this.destinationPath(path.join('src', 'core', 'dtos', 'index.ts')),
    //   `export * from './${name}.dto';\n`,
    //   { conflict: 'force' }
    // );

    // // src/core/entities
    // this.fs.copyTpl(
    //   this.templatePath('entity.ts.ejs'),
    //   this.destinationPath(path.join('src', 'core', 'entities', `${name}.entity.ts`)),
    //   { pascalCaseName }
    // );
    // this.fs.append(
    //   this.destinationPath(path.join('src', 'core', 'entities', 'index.ts')),
    //   `export * from './${name}.entity';\n`,
    //   { conflict: 'force' }
    // );

    // // src/frameworks/data-services/mongo/model
    // this.fs.copyTpl(
    //   this.templatePath('model.ts.ejs'),
    //   this.destinationPath(path.join('src', 'frameworks', 'data-services', 'mongo', 'model', `${name}.model.ts`)),
    //   { pascalCaseName }
    // );
    // this.fs.append(
    //   this.destinationPath(path.join('src', 'frameworks', 'data-services', 'mongo', 'model', 'index.ts')),
    //   `export * from './${name}.model';\n`,
    //   { conflict: 'force' }
    // );

    // // src/frameworks/data-services/mongo/mongo-data-services.module.ts
    // const mongoDataServicesModulePath = this.destinationPath(path.join('src', 'frameworks', 'data-services', 'mongo', 'mongo-data-services.module.ts'));
    // let mongoDataServicesModuleContent = this.fs.read(mongoDataServicesModulePath);

    // const modelImportPattern = /import\s*{\s*([^}]+)\s*}\s*from\s*"\.\/model";/;
    // const match = mongoDataServicesModuleContent.match(modelImportPattern);
    // if (match) {
    //   const imports = match[1];
    //   const newImports = `${imports.trim()},\n  ${pascalCaseName},\n  ${pascalCaseName}Schema`;
    //   const newModelImportStatement = `import { ${newImports} } from "./model";`;
    //   mongoDataServicesModuleContent = mongoDataServicesModuleContent.replace(modelImportPattern, newModelImportStatement);
    // } else {
    //   this.log(chalk.red(`Failed to match import statement in mongo-data-services.module.ts`));
    // }

    // const forFeaturePattern = /MongooseModule\.forFeature\(\[\s*([\s\S]*?)\s*\]\)/;
    // const newForFeatureStatement = mongoDataServicesModuleContent.replace(forFeaturePattern, (match, imports) => {
    //   const newImport = `{ name: ${pascalCaseName}.name, schema: ${pascalCaseName}Schema },`;
    //   return `MongooseModule.forFeature([\n      ${imports.trim()},\n      ${newImport}\n    ])`;
    // });
    // mongoDataServicesModuleContent = newForFeatureStatement;

    // this.fs.write(mongoDataServicesModulePath, mongoDataServicesModuleContent);

    // // src/frameworks/data-services/mongo/mongo-data-services.service.ts
    // const mongoDataServicePath = this.destinationPath(path.join('src', 'frameworks', 'data-services', 'mongo', 'mongo-data-services.service.ts'));
    // let mongoDataServiceContent = this.fs.read(mongoDataServicePath);

    // // 修改1: 新增 pascalCaseName 和 pascalCaseNameDocument 的引入
    // const importMatch = mongoDataServiceContent.match(modelImportPattern);
    // if (importMatch) {
    //   const imports = importMatch[1];
    //   const newImports = `${imports.trim()},\n  ${pascalCaseName},\n  ${documentName}`;
    //   const newImportStatement = `import { ${newImports} } from "./model";`;
    //   mongoDataServiceContent = mongoDataServiceContent.replace(importPattern, newImportStatement);
    // } else {
    //   this.log(chalk.red(`Failed to match import statement in mongo-data-services.service.ts`));
    // }

    // // 修改2: 新增属性
    // const propertyPattern = /implements IDataServices, OnApplicationBootstrap\s*\{([\s\S]*?)constructor\(/;
    // const propertyMatch = mongoDataServiceContent.match(propertyPattern);
    // if (propertyMatch) {
    //   const properties = propertyMatch[1];
    //   const newProperties = `${properties}  ${camelCaseName}s: MongoGenericRepository<${pascalCaseName}>;\n`;
    //   const newPropertyStatement = `implements IDataServices, OnApplicationBootstrap {\n${newProperties}`;
    //   mongoDataServiceContent = mongoDataServiceContent.replace(propertyPattern, newPropertyStatement);
    // } else {
    //   this.log(chalk.red(`Failed to match properties in mongo-data-services.service.ts`));
    // }

    // // 修改3: 新增构造函数参数
    // const constructorPattern = /constructor\(([\s\S]*?)\)\s*\{/;
    // const constructorMatch = mongoDataServiceContent.match(constructorPattern);
    // if (constructorMatch) {
    //   const constructorParams = constructorMatch[1];
    //   const newConstructorParams = `${constructorParams.trim()},\n\n    @InjectModel(${pascalCaseName}.name)\n    private ${camelCaseName}Repository: Model<${documentName}>,`;
    //   const newConstructorStatement = `constructor(${newConstructorParams}) {`;
    //   mongoDataServiceContent = mongoDataServiceContent.replace(constructorPattern, newConstructorStatement);
    // } else {
    //   this.log(chalk.red(`Failed to match constructor in mongo-data-services.service.ts`));
    // }

    // // 修改4: 初始化属性
    // const bootstrapPattern = /onApplicationBootstrap\(\)\s*\{([\s\S]*?)\}\s*\n\s*}/;
    // const bootstrapMatch = mongoDataServiceContent.match(bootstrapPattern);
    // if (bootstrapMatch) {
    //   const bootstrapContent = bootstrapMatch[1];
    //   const newBootstrapContent = `${bootstrapContent.trim()}\n\n    this.${camelCaseName}s = new MongoGenericRepository<${pascalCaseName}>(this.${camelCaseName}Repository);`;
    //   const newBootstrapStatement = `onApplicationBootstrap() {\n${newBootstrapContent}\n  }\n}`;
    //   mongoDataServiceContent = mongoDataServiceContent.replace(bootstrapPattern, newBootstrapStatement);
    // } else {
    //   this.log(chalk.red(`Failed to match onApplicationBootstrap in mongo-data-services.service.ts`));
    // }

    // this.fs.write(mongoDataServicePath, mongoDataServiceContent);

    // // src/use-cases
    // const useCasesFolderPath = this.destinationPath(path.join('src', 'use-cases', name));
    // mkdirSync(useCasesFolderPath, { recursive: true });

    // this.fs.copyTpl(
    //   this.templatePath('use-case.ts.ejs'),
    //   this.destinationPath(path.join(useCasesFolderPath, `${name}.use-case.ts`)),
    //   { name, pascalCaseName }
    // );

    // // Create name-use-cases.module.ts
    // this.fs.copyTpl(
    //   this.templatePath('use-cases.module.ts.ejs'),
    //   this.destinationPath(path.join(useCasesFolderPath, `${name}-use-cases.module.ts`)),
    //   { name, pascalCaseName }
    // );

    // // Create index.ts
    // this.fs.copyTpl(
    //   this.templatePath('use-cases.index.ts.ejs'),
    //   this.destinationPath(path.join(useCasesFolderPath, 'index.ts')),
    //   { name, pascalCaseName }
    // );

    // app.module.ts
    const appModulePath = this.destinationPath('src/app.module.ts');
    let appModuleContent = this.fs.read(appModulePath);

    // 修改1: 新增 pascalCaseNameController 的导入
    const controllerImportPattern = /import\s*\{\s*([\s\S]*?)\s*\}\s*from\s*"\@controllers\/index";/;
    const controllerImportMatch = appModuleContent.match(controllerImportPattern);
    if (controllerImportMatch) {
      const imports = controllerImportMatch[1];
      const newImports = `${imports.trim()},\n  ${pascalCaseName}Controller`;
      const newImportStatement = `import { ${newImports} } from "@controllers/index";`;
      appModuleContent = appModuleContent.replace(controllerImportPattern, newImportStatement);
    } else {
      this.log(chalk.red(`Failed to match controller import statement in app.module.ts`));
    }

    // 修改2: 新增 pascalCaseNameUseCasesModule 的导入
    const useCasesImportPattern = /import\s*\{\s*([\s\S]*?)\s*\}\s*from\s*"\@use-cases\/[^"]+";/g;
    const useCasesImportMatches = appModuleContent.match(useCasesImportPattern);
    
    if (useCasesImportMatches) {
      const lastImportMatch = useCasesImportMatches[useCasesImportMatches.length - 1];
      const newImportStatement = `${lastImportMatch}\nimport { ${pascalCaseName}UseCasesModule } from "@use-cases/${name}";`;
      appModuleContent = appModuleContent.replace(lastImportMatch, newImportStatement);
    } else {
      this.log(chalk.red(`Failed to match use-cases import statements in app.module.ts`));
    }
    // 修改3: 新增 pascalCaseNameUseCasesModule 和 pascalCaseNameController 到 imports 和 controllers
    const modulePattern = /@Module\(\s*\{([\s\S]*?)\}\s*\)/;
    const moduleMatch = appModuleContent.match(modulePattern);
    if (moduleMatch) {
      const moduleContent = moduleMatch[1];

      // 修改 imports
      const importsPattern = /imports:\s*\[\s*([\s\S]*?)\s*\],/;
      const importsMatch = moduleContent.match(importsPattern);
      if (importsMatch) {
        const imports = importsMatch[1];
        const newImports = `${imports.trim()},\n    ${pascalCaseName}UseCasesModule`;
        const newImportsStatement = `imports: [\n    ${newImports}\n  ],`;
        appModuleContent = appModuleContent.replace(importsMatch[0], newImportsStatement);
      } else {
        this.log(chalk.red(`Failed to match imports in app.module.ts`));
      }

      // 修改 controllers
      const controllersPattern = /controllers:\s*\[\s*([\s\S]*?)\s*\],/;
      const controllersMatch = moduleContent.match(controllersPattern);
      if (controllersMatch) {
        const controllers = controllersMatch[1];
        const newControllers = `${controllers.trim()},\n    ${pascalCaseName}Controller`;
        const newControllersStatement = `controllers: [\n    ${newControllers}\n  ],`;
        appModuleContent = appModuleContent.replace(controllersMatch[0], newControllersStatement);
      } else {
        this.log(chalk.red(`Failed to match controllers in app.module.ts`));
      }
    } else {
      this.log(chalk.red(`Failed to match @Module in app.module.ts`));
    }

    this.fs.write(appModulePath, appModuleContent);
  }
};
