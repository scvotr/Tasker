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

const handleError = (res, error) => {
  console.log('handleError', error);
  res.statusCode = 500;
  res.end(JSON.stringify({
    error: error
  }));
};

class DocsControler {
  async testDocData(req, res) {
    try {
      const authDecodeUserData = req.user;
      const userData = authDecodeUserData.payLoad;
      const templateFileName = 'template.docx'
      const new_f = 'modified_document.docx'
      const data = {
        name: userData.fields.name,
        age: userData.fields.age,
      }
      await ModifyDocxTemplate(templateFileName, new_f, [
        {key: 'USERNAME', value: userData.fields.name},
        {key: 'AGE', value: userData.fields.age},
        {key: 'DATE', value: new Date(Date.now())},
        {key: 'TIMESTART', value: '8.00'},
        {key: 'TIMEEND', value: '13.00'},
        {key: 'CURRENTDATE', value: new Date(Date.now())},
      ])
      sendResponseWithData(res, 'testDocData OK!!')
    } catch (error) {
      handleError(res, `testDocData: ${error}`)
    }
  }
}

module.exports = new DocsControler()