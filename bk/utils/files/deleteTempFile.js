const fs = require('fs');

export const deleteTempFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Temp file ${filepath} was deleted`);
  });
}
