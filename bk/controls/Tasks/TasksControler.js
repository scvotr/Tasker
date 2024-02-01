const {
  socketManager
} = require('../../utils/socket/socketManager')
const {
  usersCacheFromSocketConnects
} = require('../../socketService')

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
  getAllAppointTasksFromDep,
  getAllResponsibleTasksBySubDep,
  getAllResponsibleTasksByUserId,
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

const {
  addPendingNotification,
  updatePendingNotification,
  getPendingNotification,
  deletePendingNotification
} = require('../../Database/createDatabase')

const {
  saveAndConvert
} = require('../../utils/files/saveAndConvert');

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

      const io = socketManager.getIO()
      io.to('leadSubDep_' + fields.appoint_subdepartment_id)
        .emit('taskCreated', {
          message: 'Новая задача на согласование',
          taskData: fields.task_id
        })

      // await updateTaskStatus(postPayload)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify('Status acceptet'))
      res.end()
    } catch (error) {
      handleError(res, `addNewTask: ${error}`)
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
  //! Все задачи от Департамента 18.01.24
  async getAllAppointTasksFromDep(req, res) {
    try {
      const authDecodeUserData = req.user
      const subDep_id = authDecodeUserData.subdepartment_id
      const data = await getAllAppointTasksFromDep(subDep_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllAppointTasksFromDep')
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
  //! Все задачи для пользователя по id
  async getAllResponsibleTasksByUserId(req, res) {
    try {
      const authDecodeUserData = req.user
      const user_id = authDecodeUserData.id
      const data = await getAllResponsibleTasksByUserId(user_id)
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllResponsibleTasksByUserId')
    }
  }
  // 29_06_23 Обновить статус задачи
  async updateTaskStatus(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = JSON.parse(authDecodeUserData.payLoad)
      await updateTaskStatus(data)
      const io = socketManager.getIO()
      console.log(data)

      const inOneDep = data.appoint_department_id === data.responsible_department_id;
      const inDifDep = data.appoint_department_id !== data.responsible_department_id;
      const inOneSubDep = data.appoint_subdepartment_id === data.responsible_subdepartment_id;
      const inDifSubDep = data.appoint_subdepartment_id !== data.responsible_subdepartment_id;


      const noticeToAppointUser = (user_id) => {
        io.in('user_' + data.appoint_user_id).allSockets()
        .then(client => {
          if(client.size === 0) {
            addPendingNotification(data.appoint_user_id, data.task_id, false, 'Задача согласованна начальником')
            console.log('offline', client, data.appoint_user_id)
          } else {
            addPendingNotification(data.appoint_user_id, data.task_id, true, 'Задача согласованна начальником')
            io.to('user_' + data.appoint_user_id)
              .emit('taskApproved', {message: 'Задача согласованна начальником', taskData: data.task_id})
            console.log('online', client, data.appoint_user_id); 
          }  
        })
        .catch(error => {
            console.error(error); // Обработка ошибки
        });
      };

      // const noticeToAppointUser = (user_id) => {(
      //   io.to('user_' + data.appoint_user_id)
      //    .emit('taskApproved', {message: 'Задача согласованна начальником', taskData: data.task_id})
      //   )}
      const noticeToAppointLead  = (lead_id) => {(
        io.to('leadSubDep_' + data.appoint_subdepartment_id)
        .emit('taskApproved',{ message: 'Новая задача для отдела', taskData: data.task_id})
        )}
      const noticeToResponceUser = (user_id) => {(
        io.to('user_' + data.responsible_user_id)
        .emit('taskApproved', {message: 'Задача согласованна', taskData: data.task_id}))
      }
      const noticeToResponceLead = (lead_id) => {(
        io.to('leadSubDep_' + data.responsible_subdepartment_id)
        .emit('taskApproved',{ message: 'Новая задача для отдела', taskData: data.task_id})
      )}

      if (data.approved_on) {
        if (inOneDep && inOneSubDep) {
          console.log('Задача внутри одного отдела в одном департаменте');
          noticeToAppointUser()
        } else if (inOneDep && inDifSubDep) {
          console.log('Задача между отделами в одном департаменте');
          noticeToAppointUser()
          noticeToResponceLead()
        } else if (inDifDep && inOneSubDep) {
          console.log('Задача внутри подразделения, но между разными отделами');
        } else if (inDifDep && inDifSubDep) {
          console.log('Задача между разными подразделениями разных отделов');
        }
      }

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
      
      const io = socketManager.getIO()

      const inOneDep = data.appoint_department_id === data.responsible_department_id;
      const inDifDep = data.appoint_department_id !== data.responsible_department_id;
      const inOneSubDep = data.appoint_subdepartment_id === data.responsible_subdepartment_id;
      const inDifSubDep = data.appoint_subdepartment_id !== data.responsible_subdepartment_id;

      const noticeToAppointUser = (user_id) => {(
        io.to('user_' + data.appoint_user_id)
         .emit('taskApproved', {message: 'Пользовтель создатель: Назначен исполнитель', taskData: data.task_id}))
        }
      const noticeToAppointLead  = (lead_id) => {(
        io.to('leadSubDep_' + data.appoint_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель создатель: Назначен исполнитель', taskData: data.task_id})
        )}
      const noticeToResponceUser = (user_id) => {(
        io.to('user_' + data.responsible_user_id)
        .emit('taskApproved', {message: 'Пользователь исполнитель: Назначена новая задача', taskData: data.task_id}))
      }
      const noticeToResponceLead = (lead_id) => {(
        io.to('leadSubDep_' + data.responsible_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель исполнитель: Назначен исполнитель', taskData: data.task_id})
      )}

      if (data.setResponseUser_on) {
        if (inOneDep && inOneSubDep) {
          console.log('Задача внутри одного отдела в одном департаменте');
          noticeToAppointUser()
          noticeToResponceUser()
        } else if (inOneDep && inDifSubDep) {
          console.log('Задача между отделами в одном департаменте');
          noticeToAppointUser()
          noticeToAppointLead()
          noticeToResponceUser()
        } else if (inDifDep && inOneSubDep) {
          console.log('Задача внутри подразделения, но между разными отделами');
        } else if (inDifDep && inDifSubDep) {
          console.log('Задача между разными подразделениями разных отделов');
        }
      }

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
 
      const io = socketManager.getIO()

      const inOneDep = data.appoint_department_id === data.responsible_department_id;
      const inDifDep = data.appoint_department_id !== data.responsible_department_id;
      const inOneSubDep = data.appoint_subdepartment_id === data.responsible_subdepartment_id;
      const inDifSubDep = data.appoint_subdepartment_id !== data.responsible_subdepartment_id;

      const noticeToAppointUser = (user_id) => {(
        io.to('user_' + data.appoint_user_id)
         .emit('taskApproved', {message: 'Пользовтель создатель: Задача выполнена', taskData: data.task_id}))
        }
      const noticeToAppointLead  = (lead_id) => {(
        io.to('leadSubDep_' + data.appoint_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель создатель: Задача выполнена', taskData: data.task_id})
        )}
      const noticeToResponceUser = (user_id) => {(
        io.to('user_' + data.responsible_user_id)
        .emit('taskApproved', {message: 'Пользователь исполнитель: готово', taskData: data.task_id}))
      }
      const noticeToResponceLead = (lead_id) => {(
        io.to('leadSubDep_' + data.responsible_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель исполнитель: Задача выполнена', taskData: data.task_id})
      )}

      if (data.confirmation_on) {
        if (inOneDep && inOneSubDep) {
          console.log('Задача внутри одного отдела в одном департаменте');
          noticeToAppointUser()
          noticeToAppointLead()
        } else if (inOneDep && inDifSubDep) {
          console.log('Задача между отделами в одном департаменте');
          noticeToAppointUser()
          noticeToAppointLead()
          noticeToResponceLead()
        } else if (inDifDep && inOneSubDep) {
          console.log('Задача внутри подразделения, но между разными отделами');
        } else if (inDifDep && inDifSubDep) {
          console.log('Задача между разными подразделениями разных отделов');
        }
      }

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

      const io = socketManager.getIO()

      const inOneDep = data.appoint_department_id === data.responsible_department_id;
      const inDifDep = data.appoint_department_id !== data.responsible_department_id;
      const inOneSubDep = data.appoint_subdepartment_id === data.responsible_subdepartment_id;
      const inDifSubDep = data.appoint_subdepartment_id !== data.responsible_subdepartment_id;

      const noticeToAppointUser = (user_id) => {(
        io.to('user_' + data.appoint_user_id)
         .emit('taskApproved', {message: 'Пользовтель создатель: Задача закрыта', taskData: data.task_id}))
        }
      const noticeToAppointLead  = (lead_id) => {(
        io.to('leadSubDep_' + data.appoint_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель создатель: Задача закрыта', taskData: data.task_id})
        )}
      const noticeToResponceUser = (user_id) => {(
        io.to('user_' + data.responsible_user_id)
        .emit('taskApproved', {message: 'Пользователь исполнитель: подтверждена', taskData: data.task_id}))
      }
      const noticeToResponceLead = (lead_id) => {(
        io.to('leadSubDep_' + data.responsible_subdepartment_id)
        .emit('taskApproved',{ message: 'Руководитель исполнитель: Задача закрыта', taskData: data.task_id})
      )}

      if (data.closed_on) {
        if (inOneDep && inOneSubDep) {
          console.log('Задача внутри одного отдела в одном департаменте');
          noticeToAppointLead()
          noticeToResponceUser()
        } else if (inOneDep && inDifSubDep) {
          console.log('Задача между отделами в одном департаменте');
          noticeToAppointLead()
          noticeToResponceUser()
          noticeToResponceLead()
        } else if (inDifDep && inOneSubDep) {
          console.log('Задача внутри подразделения, но между разными отделами');
        } else if (inDifDep && inDifSubDep) {
          console.log('Задача между разными подразделениями разных отделов');
        }
      }

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





// io.to('allChifeRoom').emit('messageForChiefs', 'Сообщение только для начальников!!!!')
// io.to('allHPRRoom').emit('messageToHPR', 'Это сообщение для всех в комнате HPR');

//? await sendRabbitMQMessage('tasks_queue', { action: 'TaskCreated', taskData: data });
//? sendKafkaMessage('task_creation_topic', { action: 'TaskCreated', taskData: data });
//? publishRedisMessage('task_events', { action: 'TaskCreated', taskData: data });


// --------------------------------
// const io = socketManager.getIO()
// !io.emit('leadSubDep_' + fields.appoint_subdepartment_id, { message: 'Новая задача на согласование', taskData: fields });
// io.to('leadSubDep_' + fields.appoint_subdepartment_id)
// .emit('newTask', { message: 'Новая задача на согласование', taskData: fields })
// --------------------------------