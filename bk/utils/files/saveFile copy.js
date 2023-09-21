const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();
const defaultPath = currentDirectory +'/uploads'

const saveFile = async(file, folderPath = defaultPath) => {
  try {
    // Проверяем права на запись в директорию
    await new Promise((resolve, reject) => {
      fs.access(folderPath, fs.constants.W_OK, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    const ext = path.extname(file.originalFilename)
    const fileName = `${Date.now()}${ext}`; // задаем имя файла, например, используя метку времени
    const newFilePath = path.join(folderPath, fileName); // задаем полный путь к файлу
    // Копируем файл из временной директории в целевую
    await new Promise((resolve, reject) => {
      fs.copyFile(file.filepath, newFilePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Удаляем исходный файл
    fs.unlink(file.filepath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return fileName;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = saveFile;

// V_1 version
// const saveFile = async(file, folderPath = defaultPath) =>{
//   const ext = path.extname(file.originalFilename)
//   const fileName = `${Date.now()}${ext}`; // задаем имя файла, например, используя метку времени
//   const newFilePath = path.join(folderPath, fileName); // задаем полный путь к файлу
//   // Сохраняем файл на диск
//   await new Promise((resolve, reject) => {
//     fs.copyFile(file.filepath, newFilePath, err => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });

//   return fileName;
// }