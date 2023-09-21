const saveFile = async (file, folder = null, folderPath = defaultPath) => {
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
    const ext = path.extname(file.originalFilename);
    console.log('ext', ext)
    const fileName = `${Date.now()}${ext}`; // задаем имя файла, например, используя метку времени
    const folderFullPath = path.join(folderPath, folder) // полный путь 
    const newFilePath = path.join(folderFullPath, fileName); // задаем полный путь к файлу
    // Создаем папку, если она не существует
    if (!fs.existsSync(folderFullPath)) {
      fs.mkdirSync(folderFullPath, {
        recursive: true
      });
    }
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
    let thumbnailFileName = ''
    let compersFileName = ''
    if (ext !== '.pdf') {
      // Создаем превью изображения
      thumbnailFileName = `thumbnail_${fileName}`;
      const thumbnailFilePath = path.join(folderFullPath, thumbnailFileName);
      try {
        await sharp(newFilePath)
          .resize(200, 200)
          .toFile(thumbnailFilePath)
      } catch (error) {
        console.log('thumbnailFileName', error)
      }
      compersFileName = `compres_${fileName}`
      const compresFilePath = path.join(folderFullPath, compersFileName)
      try {
        await sharp(newFilePath)
          .resize(1024) // Ширина 800 пикселей (высота будет автоматически рассчитана)
          .toFormat('jpeg', {
            mozjpeg: true,
            // quality: 100,
            chromaSubsampling: '4:4:4'
          })
          .toFile(compresFilePath)
      } catch (error) {
        console.log('compersFileName', error)
      }
    } else {
      thumbnailFileName = ''
      compersFileName = ''
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
}






const saveFile = async (file, folder = null, folderPath = defaultPath) => {
  try {
    // Проверяем права на запись в директорию
    await fs.promises.access(folderPath, fs.constants.W_OK);

    const ext = path.extname(file.originalFilename);
    console.log('ext', ext);
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