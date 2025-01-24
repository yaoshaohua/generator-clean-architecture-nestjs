/**
 * Regular expressions used in the generator
 */
module.exports = {
  REGEX_IDATASERVICES_ABSTRACT_CLASS: /(export\s+abstract\s+class\s+IDataServices\s*\{[\s\S]*?)(?=\})/,

  REGEX_MONGOOSEMODULE_FORFEATURE_MODELS: /(MongooseModule\.forFeature\(\[\s*[\s\S]*?)(?=\s*\]\))/,

  REGEX_MONGODATASERVICES_CLASS_UNTIL_CONSTRUCTOR: /(implements IDataServices, OnApplicationBootstrap\s*\{[\s\S]*?)(?=\n\s*constructor\()/,
  REGEX_MONGODATASERVICES_CONSTRUCTOR_PARAMETERS: /(constructor\([\s\S]*?)(?=\n\s*\)\s*\{)/,
  REGEX_MONGODATASERVICES_ONAPPLICATIONBOOTSTRAP_IMPLEMENTATION: /(onApplicationBootstrap\(\)\s*\{[\s\S]*?)(?=\n\s*\}\s*\n\s*})/,

  REGEX_USE_CASE_IMPORT: /import\s*{[^}]*}\s*from\s*['"][^'"]*['"];/g,
  REGEX_MODULE_IMPORTS: /(imports:\s*\[\s*[\s\S]*?)(?=\s*\],)/,
  REGEX_MODULE_CONTROLLERS: /(controllers:\s*\[\s*[\s\S]*?)(?=\s*\],)/,
};
