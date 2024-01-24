'use strict'

const fs = require('fs');
const path = require('path');
const {
  ModifyDocxTemplate
} = require('./utils/ModifyDocxTemplate/ModifyDocxTemplate');
const {
  convertDocxToPdf
} = require('./utils/DocxToPDF/DocxToPDF')
const {
  AddWatermark
} = require('./utils/AddWatermark/AddWatermark');
const logger = require('../../utils/logger/logger');

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
      const newDocxFileName = 'modified_document.docx';

      // Модифицируем шаблон документа с использованием данных пользователя
      const modifiedContent = await ModifyDocxTemplate(templateFileName, newDocxFileName, [{
          key: 'USERNAME',
          value: userData.fields.name
        },
        {
          key: 'CURRENTDATE',
          value: userData.fields.currentData
        },
        {
          key: 'SDATE',
          value: userData.fields.selectData
        },
        {
          key: 'TIMESTART',
          value: userData.fields.timeStart
        },
        {
          key: 'TIMEEND',
          value: userData.fields.timeEnd
        },
        {
          key: 'DATEONCREATE',
          value: new Date(Date.now())
        },
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
    const currentDirectory = process.cwd();
    const authDecodeUserData = req.user;
    const userData = authDecodeUserData.payLoad;
    const templateFileName = 'uploads/templates/test_tmp.docx';
    const newDocxFileName = 'modified_test_tmp.docx';
  
    const modifiedContent = await ModifyDocxTemplate(templateFileName, newDocxFileName, [{
      key: 'USERNAME',
      value: userData.fields.name
    },
    {
      key: 'TEXT',
      value: userData.fields.text
    },
    {
      key: 'DATEONCREATE',
      value: new Date(Date.now())
    }]);
  
    const fullPathToDocxFile = path.join(currentDirectory, newDocxFileName);
    const purePdfFile = path.join(currentDirectory, 'output.pdf');
    const outputPdfWithWatermarkPath = path.join(currentDirectory, 'output_with_watermark.pdf');
  
    const watermarkText = `ID пользователя ${authDecodeUserData.id}`;
  
    try {
      const pdfDone = await convertDocxToPdf(modifiedContent.content, fullPathToDocxFile)
      await fs.promises.writeFile(purePdfFile, pdfDone);
  
      const pdfWithWatermark = await AddWatermark(pdfDone, watermarkText)
      const fileExists = await fs.promises.access(outputPdfWithWatermarkPath)
        .then(() => (true))
        .catch(() => (false))
      if (!fileExists) {
        await fs.promises.writeFile(outputPdfWithWatermarkPath, pdfWithWatermark);
      }
      
      logger.info(`File ${outputPdfWithWatermarkPath} has been sent to the client.`);
      sendFileResponse(res, pdfWithWatermark, 'output_with_watermark.pdf')
  
    } catch (error) {
      logger.error(`testToPDF error: ${error.message}`);
      // Обработка ошибки, если она все же возникнет
    }
  }
}

module.exports = new DocsControler()