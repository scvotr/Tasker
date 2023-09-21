const deleteFile = async (fileName, folder = null, folderPath = defaultPath) => {
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


































const deleteFile = async (fileName, folder = null, folderPath = defaultPath) => {
  try {
    const file_ext = path.extname(fileName);
    const fullFilePath = path.join(folderPath, folder)
    const filePath = path.join(fullFilePath, fileName);
    const thumbnailFilePath = path.join(fullFilePath, `thumbnail_${fileName}`);
    const compresFilePath = path.join(fullFilePath, `compres_${fileName}`);
    if (file_ext === '.pdf') {
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } else {
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      await new Promise((resolve, reject) => {
        fs.unlink(thumbnailFilePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      await new Promise((resolve, reject) => {
        fs.unlink(compresFilePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}