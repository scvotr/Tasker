/**
 * Modifies a .docx template file with the specified modifications and saves the result to the output file.
 * @param {string} inputFilePath - The path of the input .docx file.
 * @param {string} outputFilePath - The path where the modified .docx file will be saved.
 * @param {Array} modifications - An array of objects containing key-value pairs for modifications.
 * @returns {Promise<void>} - A Promise that resolves when the file is successfully modified and saved.
 */
/**
 * Модифицирует файл шаблона .docx с указанными изменениями и сохраняет результат в выходной файл.
 * @param {string} inputFilePath - Путь к входному файлу .docx.
 * @param {string} outputFilePath - Путь, по которому будет сохранен измененный файл .docx.
 * @param {Array} modifications - Массив объектов, содержащих пары ключ-значение для модификаций.
 * @returns {Promise<void>} - Промис, который разрешается, когда файл успешно модифицирован и сохранен.
 */

'use strict'

const fs = require('fs').promises;
const path = require('path');
const JSZip = require('jszip');
const xml2js = require('xml2js');

const ModifyDocxTemplate = async (inputFilePath, outputFilePath, modifications) => {
  const currentDirectory = process.cwd(); // Получаем текущую директорию
  const templateFullPath = path.join(currentDirectory, inputFilePath);
  const modifyFullPath = path.join(currentDirectory, outputFilePath);

  try {
    const data = await fs.readFile(templateFullPath); // Чтение файла с использованием fs.promises
    const zip = await JSZip.loadAsync(data);
    
    // Выполнение операций с содержимым .docx файла
    let documentContent = await zip.file('word/document.xml').async('string');

    for(const key in modifications) {
      const placeholder = new RegExp(`<w:t>${modifications[key].key}<\\/w:t>`, 'g');
      const newData =  modifications[key].value
      // Замена подстроки    documentContent = documentContent.replace(/<w:t>USERNAME<\/w:t>/g, '<w:t>Работает</w:t>');
      documentContent = documentContent.replace(placeholder, `<w:t>${newData}</w:t>`);
    }
      
    // Обновление содержимого файла в объекте zip
    zip.file('word/document.xml', documentContent);
    
    // Сохранение измененного файла
    const content = await zip.generateAsync({ type: 'nodebuffer' });
    await fs.writeFile(modifyFullPath, content);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = {
  ModifyDocxTemplate
};