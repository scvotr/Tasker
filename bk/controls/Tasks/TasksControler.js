const {
  saveFile,
  deleteFile,
  removeFolder
} = require('../../utils/files/saveFile')

const {
  createNewTask_V02,
  getAllUserTasks,
  getAllTasksByDep,
  getAllTasksBySubDep,
  getAllResponsibleTasksByDep,
  getAllResponsibleTasksBySubDep,
  updateTaskStatus,
  updateTaskResponceSubDep,
  updateTaskConfirmRequest,
  updateTask,
  removeTask,
  updateTaskCloseRequest,
  getFullFileContent,
  getPreviewFileContent,
  updateTaskRejectRequest,
} = require('../../Database/TasksQuery/TasksQuery');

const { saveAndConvert } = require('../../utils/files/saveAndConvert');

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


class TasksControler {
  async addNewTask(req, res) {
    try {
      const authDecodeUserData = req.user
      const user_id = authDecodeUserData.id
      const postPayload = authDecodeUserData.payLoad
      const fields = postPayload.fields;
      const files = postPayload.files
      const taskFolder = fields.task_id
      const fileNames = [];
      for (const [key, file] of Object.entries(files)) {
        try {
          const fileName = await saveAndConvert(file, taskFolder)
          fileNames.push(fileName.fileName);
        } catch (error) {
          console.error('Error saving file:', error);
        }
      }
      const data = {
        fields,
        fileNames,
        user_id
      }
      await createNewTask_V02(data)
      // await updateTaskStatus(postPayload)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify('Status acceptet'))
      res.end()
    } catch (error) {
      handleError(res, `addNewTask${error}`)
    }
  }
  // Все задачи по ID пользоветля
  async getAllUserTasks(req, res) {
    try {
      const authDecodeUserData = req.user
      const user_id = authDecodeUserData.id
      const data = await getAllUserTasks(user_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllUserTasks')
    }
  }
  // Все задачи по депортаменту
  async getAllTasksByDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const dep_id = authDecodeUserData.department_id
      const data = await getAllTasksByDep(dep_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllTasksByDep')
    }
  }
  // Все задачи по Отделам
  async getAllTasksBySubDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const subDep_id = authDecodeUserData.subdepartment_id
      const data = await getAllTasksBySubDep(subDep_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllTasksBySubDep')
    }
  }
  //! Все задачи для Департамента 31.08.23
  async getAllResponsibleTasksByDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const subDep_id = authDecodeUserData.subdepartment_id
      const data = await getAllResponsibleTasksByDep(subDep_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllResponsibleTasksByDep')
    }
  }
  // Все задачи для Отделам
  async getAllResponsibleTasksBySubDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const subDep_id = authDecodeUserData.subdepartment_id
      const data = await getAllResponsibleTasksBySubDep(subDep_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllResponsibleTasksBySubDep')
    }
  }
  // 29_06_23 Обновить статус задачи
  async updateTaskStatus(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskStatus(data)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'updateTaskStatus')
    }
  }
  // 12_07_23 Добавить изменить отвественый отдел
  async updateTaskResponceSubDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskResponceSubDep(data)
      sendResponseWithData(res, 'updateTaskResponceSubDep')
    } catch (error) {
      handleError(res, 'updateTaskResponceSubDep')
    }
  }
  // 12_07_23 Запрос на закрытие
  async updateTaskConfirmRequest(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskConfirmRequest(data)
      sendResponseWithData(res, 'updateTaskConfirmRequest')
    } catch (error) {
      handleError(res, 'updateTaskConfirmRequest')
    }
  }
  // 20_07_23 закрытие задачи пользователем
  async updateTaskCloseRequest(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskCloseRequest(data)
      sendResponseWithData(res, 'updateTaskCloseRequest')
    } catch (error) {
      handleError(res, 'updateTaskCloseRequest')
    }
  }
  // 29_08_23 отклонение задачи пользователем
  async updateTaskRejectRequest(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskRejectRequest(data)
      sendResponseWithData(res, 'updateTaskRejectRequest')
    } catch (error) {
      handleError(res, 'updateTaskRejectRequest')
    }
  }

  async updateTask(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = authDecodeUserData.payLoad
      const fields = postPayload.fields;
      const files = postPayload.files;
      const fileNames = [];
      const taskFolderName = postPayload.fields.task_id
      const filesToRemoveName = postPayload.fields.filesToRemove
      
      if (filesToRemoveName) {
        const arrFilesToRemove = filesToRemoveName.split(",")
        for (const [key] of Object.entries(arrFilesToRemove)) {
          await deleteFile(arrFilesToRemove[key], taskFolderName)
        }
      }
      // если есть новые файлы от пользователя
      if (files) {
        for (const [key, file] of Object.entries(files)) {
          const fileName = await saveFile(file, taskFolderName)
          fileNames.push(fileName.fileName);
        }
      }
      await updateTask(postPayload, fileNames)
      sendResponseWithData(res, 'updateTask')
    } catch (error) {
      handleError(res, 'updateTask')
    }
  }

  async removeTask(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = JSON.parse(authDecodeUserData.payLoad)
      const taskFolderName = postPayload.task_id
      await removeTask(postPayload)
      await removeFolder(taskFolderName)
      sendResponseWithData(res, 'removeTask')
    } catch (error) {
      handleError(res, 'removeTask')
    }
  }

  async getFullFileContent(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = JSON.parse(authDecodeUserData.payLoad)
      const data = await getFullFileContent(postPayload)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getFullFileContent')
    }
  }

  async getPreviewFileContent(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = JSON.parse(authDecodeUserData.payLoad)
      const data = await getPreviewFileContent(postPayload)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getPreviewFileContent')
    }
  }
}

module.exports = new TasksControler()