const fs = require('fs').promises;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('../utils/logger/logger');

const currentDirectory = process.cwd();

const initialSQLiteFile = async(fileName) => {
  try {
    await fs.access(fileName, fs.constants.F_OK)
    console.log(`Файл базы данных ${fileName} уже существует`)
  } catch (error) {
    new sqlite3.Database(fileName, (err) => {
      if(err) {
        logger.error(`Ошибка при создании файла базы данных ${fileName}: ${err}`);
        return
      }
      console.log('Создан новый файл базы данных:', fileName);
    })
  }
}
// USAGE
// (async () => {
//   await initialSQLiteFile('../database2.db');
//   // Здесь код для создания таблицы
// })();

module.exports = initialSQLiteFile


  // const fillPath = path.join(currentDirectory, fileName)
  // fs.access(fileName, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     new sqlite3.Database(fileName)
  //     logger.error(`Фаил базы данных отсутсвует ${fileName} : ${err}`)
  //     logger.info(`Создан новый файл базы данных: ${fileName}`)
  //     console.log('Создан новый файл базы данных: ', fileName);
  //   } else {
  //     console.log(`Файл базы данных ${fileName} уже существует`);
  //   }
  // })