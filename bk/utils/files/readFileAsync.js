const fs = require("fs");

export const readFileAsync = (file_path, encoding = "base64") => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(file_path, encoding, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};