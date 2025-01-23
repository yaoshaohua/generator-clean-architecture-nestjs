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
  },

  chainFileOperations(fs, filePath) {
    const fileChain = {
      content: undefined,
      read: () => {
        fileChain.content = fs.read(filePath);
        return fileChain;
      },

      appendToImport: (modulePath, newItem) => {
        const regex_import = new RegExp(`import\\s*{\\s*([^}]+)\\s*}\\s*from\\s*"${modulePath}"\\s*;?`);
        fileChain.content = fileChain.content.replace(regex_import, (match, p1) => {
          p1 = p1.trim().replace(/,$/, '');
          return `import { ${p1}, ${newItem} } from "${modulePath}";`;
        });
        return fileChain;
      },

      insertNewImportStatement: (newImportLine) => {
        const regex_import = /import\s+[^;]*;/g;
        const imports = fileChain.content.match(regex_import);

        if (imports && imports.length > 0) {
          const lastImportIndex = fileChain.content.lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length;
          fileChain.content = fileChain.content.slice(0, lastImportIndex) + '\n' + newImportLine + fileChain.content.slice(lastImportIndex);
        }

        return fileChain;
      },

      appendToMatchWithSeparator(regex, newItem, separator = ',') {
        fileChain.content = fileChain.content.replace(regex, (match, p1) => {
          console.log('p1', p1)
          let newMatch = p1 + newItem;
          if (separator === ',') {
            newMatch = p1.trim().replace(/,$/, '') + ',' + newItem;
          }
          return newMatch
        });
        return fileChain;
      },

      write: () => {
        fs.write(filePath, fileChain.content);
        return fileChain;
      }
    }
    return fileChain;
  }
} 
