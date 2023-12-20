const fs = require('fs') //.promises;
const path = require('path');
const sharp = require('sharp');

const currentDirectory = process.cwd();
const defaultPath = path.join(currentDirectory, 'uploads')


const saveFile = async (file, folder = null, folderPath = defaultPath) => {
  try {
    // Проверяем права на запись в директорию
    await fs.promises.access(folderPath, fs.constants.W_OK);
    const ext = path.extname(file.originalFilename);
    const fileName = `${Date.now()}${ext}`; // задаем имя файла, например, используя метку времени
    const folderFullPath = path.join(folderPath, folder); // полный путь
    const newFilePath = path.join(folderFullPath, fileName); // задаем полный путь к файлу
    // Создаем папку, если она не существует
    await fs.promises.mkdir(folderFullPath, { recursive: true });
    // Копируем файл из временной директории в целевую
    await fs.promises.copyFile(file.filepath, newFilePath);
    // Удаляем исходный файл
    await fs.promises.unlink(file.filepath).catch(console.error);
    let thumbnailFileName = '';
    let compersFileName = '';
    if (ext !== '.pdf') {
      // Создаем превью изображения
      thumbnailFileName = `thumbnail_${fileName}`;
      const thumbnailFilePath = path.join(folderFullPath, thumbnailFileName);
      try {
        await sharp(newFilePath).resize(200, 200).toFile(thumbnailFilePath);
      } catch (error) {
        console.log('thumbnailFileName', error);
      }
      compersFileName = `compres_${fileName}`;
      const compresFilePath = path.join(folderFullPath, compersFileName);
      try {
        await sharp(newFilePath)
          .resize(1024) // Ширина 800 пикселей (высота будет автоматически рассчитана)
          .toFormat('jpeg', {
            mozjpeg: true,
            chromaSubsampling: '4:4:4',
          })
          .toFile(compresFilePath);
      } catch (error) {
        console.log('compersFileName', error);
      }
    }
    return {
      fileName,
      thumbnailFileName,
      compersFileName,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const deleteFile = async (fileName, folder = null, folderPath = defaultPath) => {
  console.log('folderPath', folderPath)
  try {
    const file_ext = path.extname(fileName);
    const fullFilePath = path.join(folderPath, folder);
    const filePath = path.join(fullFilePath, fileName);
    const thumbnailFilePath = path.join(fullFilePath, `thumbnail_${fileName}`);
    const compresFilePath = path.join(fullFilePath, `compres_${fileName}`);

    const unlinkFile = (filePath) => {
      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

    if (file_ext === '.pdf') {
      await unlinkFile(filePath);
    } else {
      await Promise.all([
        unlinkFile(filePath),
        unlinkFile(thumbnailFilePath),
        unlinkFile(compresFilePath),
      ]);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeFolder = async (folder, folderPath = defaultPath) => {
  try {
    const fullFolderPath = path.join(folderPath, folder)
    const files = await fs.promises.readdir(fullFolderPath)

    for (const file of files) {
      const filePath = path.join(fullFolderPath, file)
      const stats = await fs.promises.lstat(filePath)

      if (stats.isDirectory()) {
        await removeFolder(file, fullFolderPath)
      } else {
        await fs.promises.unlink(filePath)
      }
    }
    await fs.promises.rmdir(fullFolderPath)
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  saveFile,
  deleteFile,
  removeFolder,
};

// https://stackoverflow.com/questions/51291678/compress-image-using-sharp-in-node-js

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

//10-08-23
// const removeFolder = async (folder, folderPath = defaultPath) => {
//   try {
//     const fullFolderPath = path.join(folderPath, folder)
//     await new Promise((resolve, reject) => {
//       fs.rmdir(fullFolderPath, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }



// Функция `saveFile` является асинхронной функцией, которая принимает три параметра: `file`, `folder` и `folderPath`. Параметр `file` представляет файл, который нужно сохранить, в то время как параметр `folder` представляет папку, в которой файл должен быть сохранен. Параметр `folderPath` представляет путь к папке по умолчанию, где находится папка.

// Функция сначала проверяет, есть ли у пользователя права на запись в директорию, указанную в `folderPath`. Она делает это с помощью метода `fs.access`, который проверяет, доступна ли директория для записи. Если происходит ошибка, функция отклоняет промис и выбрасывает ошибку.

// Затем функция генерирует уникальное имя файла, добавляя текущую метку времени к расширению файла. Затем она создает полный путь к папке, где файл должен быть сохранен, с помощью метода `path.join`. Если папка не существует, функция создает ее с помощью метода `fs.mkdirSync`.

// Затем функция копирует файл из временного местоположения в целевое местоположение с помощью метода `fs.copyFile`. Если происходит ошибка в процессе копирования, функция отклоняет промис и выбрасывает ошибку.

// После успешного копирования файла функция удаляет исходный файл с помощью метода `fs.unlink`. Если происходит ошибка в процессе удаления, она записывается в консоль.

// Наконец, функция возвращает сгенерированное имя файла.

// Если в процессе выполнения функции возникают ошибки, они перехватываются и записываются в консоль, а ошибка выбрасывается для передачи вызывающей стороне.