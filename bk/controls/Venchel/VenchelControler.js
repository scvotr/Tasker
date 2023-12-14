const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();
const venchelsFolderPath = path.join(currentDirectory, 'uploads/venchels')

const {
  saveFile,
  deleteFile,
  removeFolder
} = require('../../utils/files/saveFile')

const { saveAndConvert } = require('../../utils/files/saveAndConvert');

const {
  createNewVenchel,
  getAllVenchels,
  removeVenchel,
  updateVenchel,
} = require("../../Database/VenchelQuery/VenchelQuery");

const { getThumbnailFiles } = require('../../utils/files/getThumbnailFiles');

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
      const fields = req.user.payLoad.fields
      const files = req.user.payLoad.files
      const venchelFolderName = fields.venchel_id
      const fileNames = []
      for(const [key, file] of Object.entries(files)) {
        try {
          const fileName = await saveAndConvert(file, venchelFolderName, venchelsFolderPath)
          fileNames.push(fileName.fileName)
        } catch (error) {
          console.error('Error saving  venchel file:', error);
        }
      }
      const data = {fields, fileNames}
      await createNewVenchel(data)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify('Status venchel created'))
      res.end()
    } catch (error) {
      handleError(res, `addNewVenchel${error}`)
    }
  }

  async getAllVenchels(req, res) {
    try {
      const data = await getAllVenchels()
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, error)
    }
  }

  async removeVenchel(req, res) {
    try {
      const fields = req.user.payLoad.fields;
      await removeVenchel(fields.venchel_id)
      sendResponseWithData(res, 'removeVenchel ok')
    } catch (error) {
      handleError(res, error)
    }
  }

  async updateVenchel(req, res) {
    try {
      const {fields, files} = req.user.payLoad
      const folderName = fields.venchel_id
      console.log(fields.files_to_remove)
      const filesToRemove = fields.files_to_remove

      if(filesToRemove) {
        const filesNames = filesToRemove.split(",")
        for(const [key] of Object.entries(filesNames)) {
          // console.log('remove', filesNames[key], folderName )
        } 
      }
      if(files) {
        for(const [key, file] of Object.entries(files)){
          // console.log('Add new', file, folderName)
        }
      }
      await updateVenchel(fields, files)
      sendResponseWithData(res, 'updateVenchel ok')
    } catch (error) {
      sendResponseWithData(res, error)
    }
  }

  async getPreviewFileContent(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = JSON.parse(authDecodeUserData.payLoad)
      const data = await getThumbnailFiles(postPayload.venchel_id, postPayload, 'venchels')
      sendResponseWithData(res, data)
    } catch (error) {
      sendResponseWithData(res, error)
    }
  }
}

module.exports = new VenchelControler()