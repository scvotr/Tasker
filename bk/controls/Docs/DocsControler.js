'use strict'

const fs = require('fs');
const path = require('path');
const { ModifyDocxTemplate } = require('./utils/ModifyDocxTemplate/ModifyDocxTemplate');
const { convertDocxToPdf , addWatermark } = require('./utils/DocxToPDF/DocxToPDF')

const sendResponseWithData = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

const sendFileResponse = (res, fileContent, fileName) => {
  res.writeHead(200, {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Content-Disposition': `attachment; filename=${fileName}`
  });
  res.end(fileContent, 'binary');
};

const handleError = (res, error) => {
  res.statusCode = 500;
  res.end(JSON.stringify({
    error: error
  }));
};

class DocsControler {
  /**
   * Обрабатывает запрос на создание тестовых документов.
   * @param {Object} req - Объект запроса. Содержит информацию о запросе, включая данные пользователя и другие параметры.
   * @param {Object} res - Объект ответа. Используется для отправки ответа клиенту, в том числе модифицированного документа или сообщения об ошибке.
   * @returns {Promise<void>} - Асинхронная функция, которая не возвращает явного значения.
   */
  async testDocData(req, res) {
    try {
      // Извлекаем данные пользователя из запроса
      const authDecodeUserData = req.user;
      const userData = authDecodeUserData.payLoad;

      // Указываем названия файлов шаблона и нового документа
      const templateFileName = 'template.docx';
      const new_f = 'modified_document.docx';

      // Модифицируем шаблон документа с использованием данных пользователя
      const modifiedContent = await ModifyDocxTemplate(templateFileName, new_f, [
        {key: 'USERNAME', value: userData.fields.name},
        {key: 'CURRENTDATE', value: userData.fields.currentData},
        {key: 'SDATE', value: userData.fields.selectData},
        {key: 'TIMESTART', value: userData.fields.timeStart},
        {key: 'TIMEEND', value: userData.fields.timeEnd},
        {key: 'DATEONCREATE', value: new Date(Date.now())},
      ]);

      // Отправляем измененный документ в ответ
      sendFileResponse(res, modifiedContent.content, 'modified_document.docx')
      // sendResponseWithData(res, 'testDocData OK!!');
    } catch (error) {
      // Обрабатываем ошибку и отправляем соответствующий статус ответа
      handleError(res, `testDocData: ${error}`);
    }
  }

  async testToPDF(req, res) {
    try {
      const authDecodeUserData = req.user;
      const userData = authDecodeUserData.payLoad;
      console.log(authDecodeUserData)
      const templateFileName = 'uploads/templates/test_tmp.docx';
      const new_f = 'modified_test_tmp.docx';

      const modifiedContent = await ModifyDocxTemplate(templateFileName, new_f, [
        {key: 'USERNAME', value: userData.fields.name},
        {key: 'TEXT', value: userData.fields.text},
        {key: 'DATEONCREATE', value: new Date(Date.now())},
      ]);

      const currentDirectory = process.cwd();
      const templateFullPath = path.join(currentDirectory, new_f);
      const outputPdfPath = path.join(currentDirectory, 'output.pdf');
      const outputPdfWithWatermarkPath = path.join(currentDirectory, 'output_with_watermark.pdf');
      console.log('outputPdfWithWatermarkPath', outputPdfWithWatermarkPath)
      const watermarkText = `ID пользователя ${authDecodeUserData.id}`;

      try {
        const test = await convertDocxToPdf(modifiedContent.content, templateFullPath)  
        await fs.promises.writeFile(outputPdfPath, test);
        const wt = await addWatermark(test, watermarkText)
        await fs.promises.writeFile(outputPdfWithWatermarkPath, wt);
        
        sendFileResponse(res, wt, 'output_with_watermark.pdf')
        // sendResponseWithData(res, 'testToPDF OK!!');
      } catch (error) {
        throw new Error(`convertDocxToPdf failed: ${error.message}`); 
      }

      } catch (error) {
        // Обрабатываем ошибку и отправляем соответствующий статус ответа
        handleError(res, `testToPDF -> testDocData: ${error}`);
      }
  }
//?------------------------ 
}

module.exports = new DocsControler()

  
      
// try {
//   // Чтение содержимого файла docx
//   const docxContent = await fs.promises.readFile(templateFullPath, 'utf-8');
//   console.log('docxContent', typeof docxContent)
//   const arrayBufferContent = Uint8Array.from(Buffer.from(docxContent));
//   // Преобразование docx в PDF и добавление водяного знака
//   const pdfBytes = await convertDocxToPdf(arrayBufferContent);
//   // const pdfBytes = await convertDocxToPdf(docxContent);

//   const result = await addWatermark(pdfBytes, watermarkText);

//   // Сохранение результатов в файлы
//   await fs.promises.writeFile(outputPdfPath, pdfBytes);
//   // await fs.promises.writeFile(outputPdfPath, result.originalPdfBytes);
//   await fs.promises.writeFile(outputPdfWithWatermarkPath, result.watermarkedPdfBytes);

//   console.log('Successfully generated PDF with watermark.');
// } catch (error) {
//   console.error('Error:', error);
// }
// sendFileResponse(res, modifiedContent, 'modified_document.docx')