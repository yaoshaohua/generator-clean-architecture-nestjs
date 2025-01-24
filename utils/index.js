module.exports = {
  chainFileOperations(fs, filePath) {
    const fileChain = {
      content: undefined,
      read: () => {
        fileChain.content = fs.read(filePath);
        return fileChain;
      },

      /**
       * Appends new import items to an existing import statement for a specific module path.
       *
       * @param {string} modulePath - The path of the module to which the imports belong.
       * @param {(string|string[])} newItems - The new import items to add. Can be a single string or an array of strings.
       * @param {Object} fileChain - An object containing the content of the file to be updated.
       * @returns {Object} - The updated file chain object.
       */
      appendToImport: (modulePath, newItems) => {
        const itemsToAdd = Array.isArray(newItems) ? newItems : [newItems];

        const regexImport = new RegExp(`import\\s*\\{\\s*([^}]+)\\s*\\}\\s*from\\s*"${modulePath}"\\s*;?`);

        fileChain.content = fileChain.content.replace(regexImport, (match, p1) => {
          // Extract and trim the existing import items, removing any trailing comma
          const existingImports = p1.trim().replace(/,$/, '').split(',').map(item => item.trim());

          const allImports = [...existingImports, ...itemsToAdd.map(item => item.trim())];

          const formattedImports = allImports.length > 1
            ? `\n  ${allImports.join(',\n  ')}\n`
            : ` ${allImports.join(' ')}`;

          return `import {${formattedImports}} from "${modulePath}";`;
        });

        return fileChain;
      },

      insertNewImportStatement: (newImportLine) => {
        const regexImport = /import\s+[^;]*;/g;
        const imports = fileChain.content.match(regexImport);

        if (imports && imports.length > 0) {
          const lastImportIndex = fileChain.content.lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length;
          fileChain.content = fileChain.content.slice(0, lastImportIndex) + '\n' + newImportLine + fileChain.content.slice(lastImportIndex);
        }

        return fileChain;
      },

      appendToMatchWithSeparator(regex, newItem, separator = ',') {
        fileChain.content = fileChain.content.replace(regex, (match, p1) => {
          const lines = p1.split('\n');
          const lastLine = lines[lines.length - 1];
          const indent = lastLine.match(/^\s*/)[0];

          const indentedNewItem = newItem.split('\n').map(line => indent + line).join('\n');

          let newMatch = p1 + indentedNewItem;
          if (separator === ',') {
            newMatch = p1.trim().replace(/,$/, '') + ',' + indentedNewItem;
          }
          return newMatch;
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
