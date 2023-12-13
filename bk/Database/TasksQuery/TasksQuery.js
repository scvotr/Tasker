const {
  queryAsyncWraper,
  queryAsyncWraperParam,
  queryAsyncWraperTransaction,
} = require("../createDatabase");
const fs = require("fs");
const path = require("path");

const createNewTask_V02 = async (data) => {
  // Добавляем задачу и получаем task_id
  let taskID;
  const command = `
    INSERT INTO tasks (task_id, task_descript, task_priority, appoint_user_id, appoint_department_id, appoint_subdepartment_id, responsible_position_id, responsible_department_id, responsible_subdepartment_id, task_status, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await queryAsyncWraperParam(
      command,
      [
        data.fields.task_id,
        data.fields.task_descript,
        data.fields.task_priority,

        data.fields.appoint_user_id,
        data.fields.appoint_department_id,
        data.fields.appoint_subdepartment_id,

        // data.fields.responsible_user_id,
        data.fields.responsible_position_id,
        data.fields.responsible_department_id,
        data.fields.responsible_subdepartment_id,

        data.fields.task_status,
        data.fields.deadline,
      ],
      "run"
    );

    taskID = data.fields.task_id;
  } catch (error) {
    console.error("createNewTask_V01 ERROR: ", error);
    return;
  }

  // Добавляем комментарий к задаче (опционально)
  if (data.fields.task_comment) {
    const command2 = `INSERT INTO task_comments (task_id, user_id ,comment) VALUES (?, ?, ?);`;
    try {
      await queryAsyncWraperParam(
        command2,
        [taskID, data.fields.appoint_user_id, data.fields.task_comment],
        "run"
      );
      console.log("Task comment added successfully");
    } catch (error) {
      console.error("Error adding task comment: ", error);
    }
  }

  // Добавляем файлы к задаче (опционально)
  for (let i = 0; i < data.fileNames.length; i++) {
    const file_name = data.fileNames[i];
    // console.log('file', file_name)
    // Если пользователь не ввел название файла и путь, пропускаем файл
    if (!file_name) {
      //.file_name || !file.file_path
      continue;
    }

    const command3 = `INSERT INTO task_files (task_id, file_name, file_path) VALUES (?, ?, ?);`;
    try {
      await queryAsyncWraperParam(command3, [taskID, file_name], "run");
      // console.log(`File ${file_name} added successfully to the task`);
    } catch (error) {
      console.error(`Error adding file ${file_name} to the task: `, error);
    }
  }
};

// !--27_06_23--------------------------------------------
const getData = async (taskFiles) => {
  const currentDirectory = process.cwd();
  const tasks = [];
  for (let i = 0; i < taskFiles.length; i++) {
    const task = taskFiles[i];
    if (task.file_names !== null) {
      task.file_names = task.file_names.split("|");
      task.old_files = []; //!
      for (let j = 0; j < task.file_names.length; j++) {
        const file_ext = path.extname(task.file_names[j]);
        const file_name = task.file_names[j];
        const file_path = `${currentDirectory}/uploads/${task.task_id}/${file_name}`; // здесь нужно указать путь к файлам
        const file_content = fs.readFileSync(file_path, "base64");
        task.old_files.push({
          //!
          type: file_ext,
          name: file_name,
          content: file_content,
        });
      }
    } else {
      task.file_names = [];
      task.files = [];
    }
    tasks.push(task);
  }
  return tasks;
};
//!-------------------------------16-080-23----------------
// Вспомогательная функция для асинхронного чтения файла
const readFileAsync = (file_path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file_path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
// При запросе всех задачь пользователя отдаем только превью фотографий 16-08-23
// Вынести в утилиты так как универсалная
const getThumbnailFiles = async (allTasks, folderName) => {
  const currentDirectory = process.cwd();
  const tasks = [];

  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];

    if (task.file_names) {
      task.file_names = task.file_names.split("|");
      task.old_files = [];

      for (let j = 0; j < task.file_names.length; j++) {
        const file_ext = path.extname(task.file_names[j]);
        const file_name = task.file_names[j];

        let file_path;
        let file_content;

        if (file_ext === ".pdf") {
          file_path = file_name;
          file_content = file_path;
        } else {
          file_path = folderName ? `${currentDirectory}/uploads/${folderName}/${task.task_id}/thumbnail_${file_name}` : `${currentDirectory}/uploads/${task.task_id}/thumbnail_${file_name}`;
          try {
            file_content = await readFileAsync(file_path, "base64");
          } catch (error) {
            file_path = `${currentDirectory}/uploads/default/404.jpg`;
            file_content = await readFileAsync(file_path, "base64");
          }
        }

        task.old_files.push({
          type: file_ext,
          name: file_name,
          // content: file_content,
        });
      }
    } else {
      task.file_names = [];
      task.files = [];
    }
    tasks.push(task);
  }
  return tasks;
};

const getTaskCompresFiles = async (file) => {
  const currentDirectory = process.cwd();
  const { type, name, task_id } = file;

  const fullFile = {};
  let file_path;
  let file_content;

  if (type === ".pdf") {
    file_path = `${currentDirectory}/uploads/${task_id}/${name}`;
    file_content = await readFileAsync(file_path, "base64");
  } else {
    file_path = `${currentDirectory}/uploads/${task_id}/compres_${name}`;
    file_content = await readFileAsync(file_path, "base64");
  }

  fullFile.type = type;
  fullFile.name = name;
  fullFile.content = file_content;

  return fullFile;
};

const getFullFileContent = async (file) => {
  const fullFile = await getTaskCompresFiles(file);
  return fullFile;
};
// 24/08/23 получение преаьх фалов при открытии формы
const getTaskPreviewFiles = async (task_id, files) => {
  const currentDirectory = process.cwd();

  const filesPrev = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { type, name } = file;
    let file_path;
    let file_content;

    file_path = `${currentDirectory}/uploads/${task_id}/thumbnail_${name}`;

    try {
      file_content = await readFileAsync(file_path, "base64");
    } catch (error) {
      file_path = `${currentDirectory}/uploads/default/404.jpg`;
      file_content = await readFileAsync(file_path, "base64");
    }

    filesPrev.push({
      type: type,
      name: name,
      content: file_content,
    });
  }
  return filesPrev;
};

const getPreviewFileContent = async (task) => {
  console.log('task', task.venchel_id, task.old_files)
  // return await getTaskPreviewFiles(task.venchel_id, task.old_files);
  return await getTaskPreviewFiles(task.task_id, task.old_files);
};

const getAllUserTasks = async (user_id) => {
  //WHERE t.appoint_user = ? OR t.responsible_user = ? получить задачи, созданные пользователем и задачи, назначенные ему,
  const command = `
    SELECT 
    t.task_id,
    t.task_descript,
    t.task_priority,
    t.task_status,
    t.deadline,
    t.appoint_user_id,
    t.created_on,
    approved_on ,                              -- Дата согласования задачи
    reject_on ,                                -- Дата отклонения задачи
    confirmation_on ,                          -- Дата запрос на подтверждение задачи
    closed_on ,                                -- Дата закрытия задачи
    setResponseSubDep_on ,                     -- Дата назначения отдела
    setResponseUser_on ,                       -- Дата назначения пользователя
    appoint_user.name AS appoint_user_name,
    t.appoint_department_id, 
    appoint_departments.name AS appoint_department_name,
    t.appoint_subdepartment_id,
    appoint_subdepartments.name AS appoint_subdepartment_name,
    t.responsible_user_id, -- ПОЛЬЗОВТЕЛЬ
    responsible_user.name AS responsible_user_name,
    t.responsible_department_id,  -- ДЕПАРТАМЕНТ
    responsible_departments.name AS responsible_department_name,
    t.responsible_subdepartment_id, -- ПОДРАЗДЕЛЕНИ
    responsible_subdepartments.name AS responsible_subdepartment_name,
    t.responsible_position_id, -- ОТДЕЛ
    responsible_position.name AS responsible_position_name,
    GROUP_CONCAT(f.file_name, '|') AS file_names
  FROM tasks t
    LEFT JOIN users AS appoint_user ON t.appoint_user_id = appoint_user.id
    LEFT JOIN departments AS appoint_departments ON t.appoint_department_id = appoint_departments.id
    LEFT JOIN subdepartments AS appoint_subdepartments ON t.appoint_subdepartment_id = appoint_subdepartments.id
    LEFT JOIN users AS responsible_user ON t.responsible_user_id = responsible_user.id
    LEFT JOIN departments AS responsible_departments ON t.responsible_department_id = responsible_departments.id
    LEFT JOIN subdepartments AS responsible_subdepartments ON t.responsible_subdepartment_id = responsible_subdepartments.id
    LEFT JOIN positions AS responsible_position ON t.responsible_position_id = responsible_position.id
    LEFT JOIN task_files f ON t.task_id = f.task_id
  WHERE t.appoint_user_id = ?
  GROUP BY t.task_id`;

  try {
    //16-08-23
    const taskFiles = await queryAsyncWraperParam(command, [user_id]);
    return await getThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};

// ВСЕ задачи от Департамента
const getAllTasksByDep = async (dep_id) => {
  //WHERE t.appoint_user = ? OR t.responsible_user = ? получить задачи, созданные пользователем и задачи, назначенные ему,
  const command = `
    SELECT 
      t.task_id,
      t.task_descript,
      t.task_priority,
      t.task_status,
      t.deadline,
      t.appoint_user_id,
      t.created_on,
      t.approved_on, -- Дата согласования задачи
      appoint_user.name AS appoint_user_name,
      t.appoint_department_id, 
      appoint_departments.name AS appoint_department_name,
      t.appoint_subdepartment_id,
      appoint_subdepartments.name AS appoint_subdepartment_name,
      t.responsible_user_id,
      responsible_user.name AS responsible_user_name,
      t.responsible_department_id, 
      responsible_departments.name AS responsible_department_name,
      t.responsible_subdepartment_id,
      responsible_subdepartments.name AS responsible_subdepartment_name,
      t.responsible_position_id,
      responsible_position.name AS responsible_position_name,
      GROUP_CONCAT(f.file_name, '|') AS file_names
    FROM tasks t
      LEFT JOIN users AS appoint_user ON t.appoint_user_id = appoint_user.id
      LEFT JOIN departments AS appoint_departments ON t.appoint_department_id = appoint_departments.id
      LEFT JOIN subdepartments AS appoint_subdepartments ON t.appoint_subdepartment_id = appoint_subdepartments.id
      LEFT JOIN users AS responsible_user ON t.responsible_user_id = responsible_user.id
      LEFT JOIN departments AS responsible_departments ON t.responsible_department_id = responsible_departments.id
      LEFT JOIN subdepartments AS responsible_subdepartments ON t.responsible_subdepartment_id = responsible_subdepartments.id
      LEFT JOIN positions AS responsible_position ON t.responsible_position_id = responsible_position.id
      LEFT JOIN task_files f ON t.task_id = f.task_id
    WHERE t.appoint_department_id = ? 
    GROUP BY t.task_id`;

  try {
    const taskFiles = await queryAsyncWraperParam(command, [dep_id]);

    return await getThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};
// ВСе задачи от подразделения
const getAllTasksBySubDep = async (subDep_id) => {
  //WHERE t.appoint_user = ? OR t.responsible_user = ? получить задачи, созданные пользователем и задачи, назначенные ему,
  const command = `
    SELECT 
      t.task_id,
      t.task_descript,
      t.task_priority,
      t.task_status,
      t.deadline,
      t.appoint_user_id,
      t.created_on,
      t.approved_on, -- Дата согласования задачи
      appoint_user.name AS appoint_user_name,
      t.appoint_department_id, 
      appoint_departments.name AS appoint_department_name,
      t.appoint_subdepartment_id,
      appoint_subdepartments.name AS appoint_subdepartment_name,
      t.responsible_user_id,
      responsible_user.name AS responsible_user_name,
      t.responsible_department_id, 
      responsible_departments.name AS responsible_department_name,
      t.responsible_subdepartment_id,
      responsible_subdepartments.name AS responsible_subdepartment_name,
      t.responsible_position_id,
      responsible_position.name AS responsible_position_name,
      GROUP_CONCAT(f.file_name, '|') AS file_names
    FROM tasks t
      LEFT JOIN users AS appoint_user ON t.appoint_user_id = appoint_user.id
      LEFT JOIN departments AS appoint_departments ON t.appoint_department_id = appoint_departments.id
      LEFT JOIN subdepartments AS appoint_subdepartments ON t.appoint_subdepartment_id = appoint_subdepartments.id
      LEFT JOIN users AS responsible_user ON t.responsible_user_id = responsible_user.id
      LEFT JOIN departments AS responsible_departments ON t.responsible_department_id = responsible_departments.id
      LEFT JOIN subdepartments AS responsible_subdepartments ON t.responsible_subdepartment_id = responsible_subdepartments.id
      LEFT JOIN positions AS responsible_position ON t.responsible_position_id = responsible_position.id
      LEFT JOIN task_files f ON t.task_id = f.task_id
    WHERE t.appoint_subdepartment_id = ? 
    GROUP BY t.task_id`;

  try {
    const taskFiles = await queryAsyncWraperParam(command, [subDep_id]);
    return await getThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};
// все задачи назначеные на отдел
const getAllResponsibleTasksBySubDep = async (subDep_id) => {
  //WHERE t.appoint_user = ? OR t.responsible_user = ? получить задачи, созданные пользователем и задачи, назначенные ему,
  const command = `
      SELECT 
      t.task_id,
      t.task_descript,
      t.task_priority,
      t.task_status,
      t.deadline,
      t.appoint_user_id,
      t.created_on,
      approved_on ,                              -- Дата согласования задачи
      reject_on ,                                -- Дата отклонения задачи
      confirmation_on ,                          -- Дата запрос на подтверждение задачи
      closed_on ,                                -- Дата закрытия задачи
      setResponseSubDep_on ,                     -- Дата назначения отдела
      setResponseUser_on ,                       -- Дата назначения пользователя
      appoint_user.name AS appoint_user_name,
      t.appoint_department_id, 
      appoint_departments.name AS appoint_department_name,
      t.appoint_subdepartment_id,
      appoint_subdepartments.name AS appoint_subdepartment_name,
      t.responsible_user_id, -- ПОЛЬЗОВТЕЛЬ
      responsible_user.name AS responsible_user_name,
      t.responsible_department_id,  -- ДЕПАРТАМЕНТ
      responsible_departments.name AS responsible_department_name,
      t.responsible_subdepartment_id, -- ПОДРАЗДЕЛЕНИ
      responsible_subdepartments.name AS responsible_subdepartment_name,
      t.responsible_position_id, -- ОТДЕЛ
      responsible_position.name AS responsible_position_name,
      GROUP_CONCAT(f.file_name, '|') AS file_names
    FROM tasks t
      LEFT JOIN users AS appoint_user ON t.appoint_user_id = appoint_user.id
      LEFT JOIN departments AS appoint_departments ON t.appoint_department_id = appoint_departments.id
      LEFT JOIN subdepartments AS appoint_subdepartments ON t.appoint_subdepartment_id = appoint_subdepartments.id
      LEFT JOIN users AS responsible_user ON t.responsible_user_id = responsible_user.id
      LEFT JOIN departments AS responsible_departments ON t.responsible_department_id = responsible_departments.id
      LEFT JOIN subdepartments AS responsible_subdepartments ON t.responsible_subdepartment_id = responsible_subdepartments.id
      LEFT JOIN positions AS responsible_position ON t.responsible_position_id = responsible_position.id
      LEFT JOIN task_files f ON t.task_id = f.task_id
    WHERE t.responsible_subdepartment_id = ? --AND  t.task_status = 'approved'
    GROUP BY t.task_id`;
  try {
    const taskFiles = await queryAsyncWraperParam(command, [subDep_id]);

    return await getThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};
//!  31.08.23 все задачи назначеные на Департамента
const getAllResponsibleTasksByDep = async (subDep_id) => {
  //WHERE t.appoint_user = ? OR t.responsible_user = ? получить задачи, созданные пользователем и задачи, назначенные ему,
  const command = `
      SELECT 
      t.task_id,
      t.task_descript,
      t.task_priority,
      t.task_status,
      t.deadline,
      t.appoint_user_id,
      t.created_on,
      approved_on ,                              -- Дата согласования задачи
      reject_on ,                                -- Дата отклонения задачи
      confirmation_on ,                          -- Дата запрос на подтверждение задачи
      closed_on ,                                -- Дата закрытия задачи
      setResponseSubDep_on ,                     -- Дата назначения отдела
      setResponseUser_on ,                       -- Дата назначения пользователя
      appoint_user.name AS appoint_user_name,
      t.appoint_department_id, 
      appoint_departments.name AS appoint_department_name,
      t.appoint_subdepartment_id,
      appoint_subdepartments.name AS appoint_subdepartment_name,
      t.responsible_user_id, -- ПОЛЬЗОВТЕЛЬ
      responsible_user.name AS responsible_user_name,
      t.responsible_department_id,  -- ДЕПАРТАМЕНТ
      responsible_departments.name AS responsible_department_name,
      t.responsible_subdepartment_id, -- ПОДРАЗДЕЛЕНИ
      responsible_subdepartments.name AS responsible_subdepartment_name,
      t.responsible_position_id, -- ОТДЕЛ
      responsible_position.name AS responsible_position_name,
      GROUP_CONCAT(f.file_name, '|') AS file_names
    FROM tasks t
      LEFT JOIN users AS appoint_user ON t.appoint_user_id = appoint_user.id
      LEFT JOIN departments AS appoint_departments ON t.appoint_department_id = appoint_departments.id
      LEFT JOIN subdepartments AS appoint_subdepartments ON t.appoint_subdepartment_id = appoint_subdepartments.id
      LEFT JOIN users AS responsible_user ON t.responsible_user_id = responsible_user.id
      LEFT JOIN departments AS responsible_departments ON t.responsible_department_id = responsible_departments.id
      LEFT JOIN subdepartments AS responsible_subdepartments ON t.responsible_subdepartment_id = responsible_subdepartments.id
      LEFT JOIN positions AS responsible_position ON t.responsible_position_id = responsible_position.id
      LEFT JOIN task_files f ON t.task_id = f.task_id
    WHERE t.responsible_department_id = ? --AND  t.task_status = 'approved'
    GROUP BY t.task_id`;
  try {
    const taskFiles = await queryAsyncWraperParam(command, [subDep_id]);

    return await getThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};

const updateTaskStatus = async (data) => {
  const { task_id, task_status } = data;
  const command = `
    UPDATE tasks
    SET task_status = ?, approved_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [task_status, task_id]);
  } catch (error) {}
};

const updateTaskResponceSubDep = async (data) => {
  const { responce_user_id, task_status, task_id } = data;
  const command = `
    UPDATE tasks
    SET responsible_position_id = ?, task_status = ?, setResponseSubDep_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [
      responce_user_id,
      task_status,
      task_id,
    ]);
  } catch (error) {}
};
// обьеденить в один запрос 13.07.23 менять метки и статусы
const updateTaskConfirmRequest = async (data) => {
  const { task_status, task_id } = data;
  const command = `
    UPDATE tasks
    SET task_status = ?, confirmation_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [task_status, task_id]);
  } catch (error) {}
};
//! обьеденить в один запрос 20.07.23 закрыть задачу\отклонить
const updateTaskCloseRequest = async (data) => {
  const { task_status, task_id } = data;
  const command = `
    UPDATE tasks
    SET task_status = ?, closed_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [task_status, task_id]);
  } catch (error) {}
};
//! обьеденить в один запрос 29.08.23 закрыть задачу\отклонить
const updateTaskRejectRequest = async (data) => {
  const { task_status, task_id } = data;
  const command = `
    UPDATE tasks
    SET task_status = ?, reject_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [task_status, task_id]);
  } catch (error) {}
};
//! 19.07.23 нет удаления коментраиев и файлов!!
const removeTask = async (data) => {
  const { task_id } = data;
  const command = `
    DELETE FROM tasks
    WHERE task_id = ?
  `;
  // 27.07.23 удаление файлов
  const command2 = `
    DELETE FROM task_files
    WHERE task_id = ?
  `;
  try {
    await queryAsyncWraperParam(command, [task_id]);
    // 27.07.23 удаление файлов
    await queryAsyncWraperParam(command2, [task_id]);
  } catch (error) {}
};

//  19.07.23
// const updateTask = async(data) => {
//   console.log('updateTask>>>>>>>>>>>>>>>>.', data)
//   // const {task_status, task_id} = data
//   const command = `
//     UPDATE tasks
//     SET task_status = ?, confirmation_on = CURRENT_TIMESTAMP
//     WHERE task_id = ?
//   `;
//   try {
//     // await queryAsyncWraperParam(command, [task_status, task_id]);
//   } catch (error) {

//   }
// }
// !=======================================================
const updateTask = async (data, test = null) => {
  const {
    task_id,
    task_status,
    task_descript,
    task_comment,
    deadline,
    responsible_department_id,
    responsible_subdepartment_id,
  } = data.fields;

  const command = `
    UPDATE tasks
      SET
        task_status = ?,
        task_descript = ?,
        deadline = ?,
        responsible_department_id  = ?,
        responsible_subdepartment_id  = ?
      WHERE task_id = ?
  `;

  // 27.07.23 удаление файлов  переделать
  const command2 = `
    DELETE FROM task_files
    WHERE file_name = ?
  `;
  //!!!!! 02-08-23 WORK
  const command3 = `INSERT INTO task_files (task_id, file_name, file_path) VALUES (?, ?, ?);`;
  if (test.length > 0) {
    try {
      for (const fileName of test) {
        await queryAsyncWraperParam(command3, [task_id, fileName], "run");
      }
    } catch (error) {}
  }

  try {
    await queryAsyncWraperParam(command, [
      task_status,
      task_descript,
      deadline,
      responsible_department_id,
      responsible_subdepartment_id,
      task_id,
    ]);

    // 27.07.23 удаление файлов
    const filesToRemove = data.fields.filesToRemove.split(",");
    for (const file_name of filesToRemove) {
      // console.log('file_name', file_name)
      await queryAsyncWraperParam(command2, [file_name]);
    }
  } catch (error) {
    // Handle error
    console.log("updateTask", error);
  }
};

//работате  но возвращает строку списка фалов
// const getAllUserTasks = async (user_id) => {
//   const command = `
//     SELECT
//       t.task_id,
//       t.task_descript,
//       t.task_priority,
//       GROUP_CONCAT(f.file_name, '|') AS file_names
//     FROM tasks t
//     LEFT JOIN task_files f ON t.task_id = f.task_id
//     WHERE t.appoint_user = ?
//     GROUP BY t.task_id`;

//   try {
//     const taskFiles = await queryAsyncWraperParam(command, [user_id]);
//     // console.log(taskFiles);
//     taskFiles.forEach(task => {
//       if (task.file_names !== null) {
//         task.file_names = task.file_names.split('|');
//       } else {
//         task.file_names = [];
//       }
//     });
//     return taskFiles;
//   } catch (error) {
//     console.error('getAllUserTasksFiles ERROR: ', error);
//   }
// }

// const getAllUserTasks = async (user_id) => {
//   const command = `
//   SELECT
//     t.task_id,
//     t.task_descript,
//     t.task_priority,
//     GROUP_CONCAT(f.file_name, ', ') AS file_names
//   FROM tasks t
//   LEFT JOIN task_files f ON t.task_id = f.task_id
//   WHERE t.appoint_user = ?
//   GROUP BY t.task_id`;

//   try {
//     const taskFiles = await queryAsyncWraperParam(command, [user_id]);
//     console.log(taskFiles);
//     return taskFiles;
//   } catch (error) {
//     console.error('getAllUserTasksFiles ERROR: ', error);
//   }
// }

// const getAllUserTasks = async(user_id) => {
//   const comand = 'SELECT * FROM tasks WHERE appoint_user = ?'
//   try {
//     const data =  await queryAsyncWraperParam(comand, [user_id])
//     return data
//   } catch (error) {
//     console.error('getAllUserTasks ERROR: ', error);
//   }
// }

module.exports = {
  createNewTask_V02,
  getAllUserTasks,
  getAllTasksByDep,
  getAllTasksBySubDep,
  updateTaskStatus,
  getAllResponsibleTasksByDep,
  getAllResponsibleTasksBySubDep,
  updateTaskResponceSubDep,
  updateTaskConfirmRequest,
  removeTask,
  updateTask,
  updateTaskCloseRequest,
  getFullFileContent,
  getPreviewFileContent,
  updateTaskRejectRequest,
  getThumbnailFiles,
};
