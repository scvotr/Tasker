const {
  saveFile,
  deleteFile,
  removeFolder
} = require('../../utils/files/saveFile')

const { saveAndConvert } = require('../../utils/files/saveAndConvert');

// databae query

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

class VenchelControler {
  async addNewVenchel(req, res) {
    try {
      const authDecodeUserData = req.user
      const user_id = authDecodeUserData.id
      const postPayload = authDecodeUserData.payLoad
      const fields = postPayload.fields;
      console.log('VenchelControler', postPayload)
    } catch (error) {
      handleError(res, 'addNewVenchel')
    }
  }
}

module.exports = new VenchelControler()