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

      console.log('userData', userData)

      await ModifyDocxTemplate(templateFileName, new_f, [
        {key: 'USERNAME', value: userData.fields.name},
        {key: 'CURRENTDATE', value: userData.fields.currentData},
        {key: 'SDATE', value: userData.fields.selectData},
        {key: 'TIMESTART', value: userData.fields.timeStart},
        {key: 'TIMEEND', value: userData.fields.timeEnd},
        {key: 'DATEONCREATE', value: new Date(Date.now())},
      ])
      sendResponseWithData(res, 'testDocData OK!!')
    } catch (error) {
      handleError(res, `testDocData: ${error}`)
    }
  }
}

module.exports = new DocsControler()