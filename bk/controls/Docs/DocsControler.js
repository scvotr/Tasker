'use strict'

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { ModifyDocxTemplate } = require('./utils/ModifyDocxTemplate/ModifyDocxTemplate');

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
      sendFileResponse(res, modifiedContent, 'modified_document.docx')
      // sendResponseWithData(res, 'testDocData OK!!');
    } catch (error) {
      // Обрабатываем ошибку и отправляем соответствующий статус ответа
      handleError(res, `testDocData: ${error}`);
    }
  }
}

module.exports = new DocsControler()