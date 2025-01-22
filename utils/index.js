module.exports = {
  /**
   * Creates a regular expression for matching import statements with an optional semicolon
   * @param {string} moduleName - The module to import from
   * @returns {RegExp} The regular expression
   */
  createImportPattern(moduleName) {
    return new RegExp(`import\\s*{\\s*([^}]+)\\s*}\\s*from\\s*"${moduleName}"\\s*;?`);
  },

  /**
   * Updates the import statement in the file content
   * @param {string} fileContent - The file content
   * @param {string} moduleName - The module to import from
   * @param {string} exportN - Name of the exports to be imported
   * @returns {string} The updated file content
   */
  updateImport(fileContent, moduleName, exportN) {
    const importPattern = this.createImportPattern(moduleName);
    return fileContent.replace(importPattern, (match, p1) => {
      // Trim any trailing comma from existing
      p1 = p1.trim().replace(/,$/, '');
      return `import { ${p1}, ${exportN} } from "${moduleName}";`;
    });
  },

  updatePattern(fileContent, pattern, newContent) {
    return fileContent.replace(pattern, (match, p1) => {
      return match.replace(p1, p1 + newContent);
    });
  }
} 
