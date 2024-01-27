const logger = require('../utils/logger/logger')
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const currentDirectory = process.cwd();

const initialSQLiteFile = (fileName) => {
  // const fillPath = path.join(currentDirectory, fileName)
  console.log('fillPath: ', fillPath)

    fs.access(fillPath, fs.constants.F_OK, (err) => {
    if (err) {
      new sqlite3.Database(fillPath)
      console.log('Создан новый файл базы данных: ', fileName);
      logger.error(`Фаил базы данных отсутсвует ${fileName} : ${err}`)
      logger.info(`Создан новый файл базы данных: ${fileName}`)
    } else {
      console.log(`Файл базы данных ${fileName} уже существует`);
    }
  })

}

module.exports = initialSQLiteFile
