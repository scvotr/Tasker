const {
  queryAsyncWraper,
  queryAsyncWraperParam,
  queryAsyncWraperTransaction
} = require('./createDatabase')

// 1 09.06.23 СОЗДАТЬ НОВУЮ ЗАДАЧУ 
const createNewTask = async (newTask) => {
  const {
    user_id,
    task_id,
    task_status,
    task_name,
    task_descript,
    appoint_user,
    responsible_user,
    deadline,
  } = newTask;
  const command = `INSERT INTO tasks (user_id, task_id, task_name, task_status, task_descript, deadline, appoint_user, responsible_user)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  try {
    await queryAsyncWraperParam(command, [user_id, task_id, task_name, task_status, task_descript, deadline, appoint_user, responsible_user], 'run')
  } catch (error) {
    console.error('DB ERROR: ', error);
    throw error;
  }
}

// 4 02.06.23 ПОЛУЧИТЬ ЗАДАЧИ КОТОРЫЕ НАЗНАЧИЛ ПОЛЬЗОВАТЕЛЬ
//!16.06.23 ПОЛУЧИТЬ ЗАДАЧИ КОТОРЫЕ НАЗНАЧИЛ ПОЛЬЗОВАТЕЛЬ c коментариями
const getUserAppointTasks = async (user_id) => {
  try {
    const command = `
      SELECT tasks.*,
      u1.name AS appoint_user,
      u2.name AS responsible_user,
      task_comments.comment,
      task_comments.created_on AS comment_created_on
      FROM tasks
      LEFT JOIN users AS u1 ON tasks.appoint_user = u1.id
      LEFT JOIN users AS u2 ON tasks.responsible_user = u2.id
      LEFT JOIN task_comments ON tasks.task_id = task_comments.task_id
      WHERE tasks.appoint_user = ?;
      `;
    return await queryAsyncWraperParam(command, [user_id]);
  } catch (error) {
    console.error('getUserAppointTasks ERROR: ', error);
  }
}
// const getUserAppointTasks = async (user_id) => {
//   try {
//     const command = `
//     SELECT tasks.*, u1.name AS appoint_user, u2.name AS responsible_user
//     FROM tasks
//     LEFT JOIN users AS u1 ON tasks.appoint_user = u1.id
//     LEFT JOIN users AS u2 ON tasks.responsible_user = u2.id
//     WHERE tasks.appoint_user = ?;
//     `;
//     return await queryAsyncWraperParam(command, [user_id]);
//   } catch (error) {
//     console.error('getUserAppointTasks ERROR: ', error);
//   }
// }
// 16_06_23 ПОЛУЧИТЬ ВСЕ КОМЕНТАРИИ К ЗАДАЧЕ
const getTasksComents = async (task_id) => {
  try {
    const command = `
    SELECT comment, created_on
    FROM task_comments
    WHERE task_id = ?;
    `;
    return await queryAsyncWraperParam(command, [task_id]);
  } catch (error) {
    console.error('getTasksComents ERROR: ', error);
  }
}

  // try {
  //   // const command = `SELECT * FROM tasks WHERE appoint_user = ?`;
  //   const command = `
  //   SELECT *
  //   FROM tasks
  //   LEFT JOIN users AS u1 ON tasks.appoint_user
  //   WHERE appoint_user = ?;`
  //   return await queryAsyncWraperParam(command, [user_id])
  // } catch (error) {
  //   console.error('getUserAppointTasks ERROR: ', error);
  // }

// --------------------------------TASK STATUS------------------
// 2 02.06.23 ПОЛУЧИТЬ НОВЫЕ ЗАДАЧИ ПОЛЬЗОВАТЕЛЯ СТАТУС = NEW
const getNewUserTasks = async (user_id) => {
  try {
    const command = `
    SELECT tasks.*, u1.name AS appoint_user, u2.name AS responsible_user
    FROM tasks
    LEFT JOIN users AS u1 ON tasks.appoint_user = u1.id
    LEFT JOIN users AS u2 ON tasks.responsible_user = u2.id
    WHERE tasks.responsible_user = ? AND task_status = 'new';
    `;
    return await queryAsyncWraperParam(command, [user_id]);
  } catch (error) {
    console.error('getUserAppointTasks ERROR: ', error);
  }
  // try {
  //   const command = `SELECT * FROM tasks WHERE responsible_user = ? AND task_status = 'new'`;
  //   return await queryAsyncWraperParam(command, [user_id])
  // } catch (error) {
  //   console.error('getNewUserTasks ERROR: ', error);
  // }
}
// 3 02.06.23 ИЗМЕНИТЬ СТАТСУ ЗАДАЧИ С НОВОЙ на ПРИНЯТУЮ
const updateTaskStatusAccept = async (task_id) => {
  try {
    const command = `UPDATE tasks SET task_status = ? WHERE id = ? `;
    return await queryAsyncWraperParam(command, ['accept', task_id], `run`);
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}
// 5 02.06.23 ПОЛУЧИТЬ ВСЕ ПРИНЯТЫЕ ЗАДАЧИ ПОЛЬЗОВТЕЛЕМ
const getUserResponceTasks = async (user_id) => {
  try {
    const command = `SELECT * FROM tasks WHERE responsible_user = ? AND task_status = 'accept'`;
    return await queryAsyncWraperParam(command, [user_id])
  } catch (error) {
    console.error('getUserResponceTasks ERROR: ', error);
  }
}
// 7 05.06.23 ИЗМЕНИТЬ СТАТСУ ЗАДАЧИ С НОВОЙ на REVIEW Требует потдверждения
const updateTaskReviewStatus = async (task_id) => {
  try {
    const command = `UPDATE tasks SET task_status = ? WHERE id = ? `;
    return await queryAsyncWraperParam(command, ['review', task_id], `run`);
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}
// 07.06.23 ПОЛУЧИТЬ НОВЫЕ ЗАДАЧИ ПОЛЬЗОВАТЕЛЯ СТАТУС = review
const getReviewTasks = async (user_id) => {
  try {
    const command = `SELECT * FROM tasks WHERE responsible_user = ? AND task_status = 'review'`;
    return await queryAsyncWraperParam(command, [user_id])
  } catch (error) {
    console.error('getReviewTasks ERROR: ', error);
  }
}
// 7 09.06.23 ИЗМЕНИТЬ СТАТСУ ЗАДАЧИ С НОВОЙ на REVIEW Требует потдверждения
const updateTaskRevieClosed = async (task_id) => {
  try {
    const command = `UPDATE tasks SET task_status = ? WHERE id = ? `;
    return await queryAsyncWraperParam(command, ['closed', task_id], `run`);
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}
// 07.06.23 ПОЛУЧИТЬ НОВЫЕ ЗАКРЫТЫЕ ПОЛЬЗОВАТЕЛЯ СТАТУС = closed
const getClosedTasks = async (user_id) => {
  try {
    const command = `SELECT * FROM tasks WHERE responsible_user = ? AND task_status = 'closed'`;
    return await queryAsyncWraperParam(command, [user_id])
  } catch (error) {
    console.error('getClosedTasks ERROR: ', error);
  }
}
// !--------------------------------------------15_06_23
const createNewTask_V01 = async(data)=>{
  console.log('createNewTask_V01', data)
  
  // Добавляем задачу и получаем task_id
  let taskID;
  const command1 = `
    INSERT INTO tasks (task_id, user_id, task_descript, task_priority, appoint_user, responsible_user, task_status, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await queryAsyncWraperParam(command1, [data.fields.task_id, data.user_id, data.fields.task_descript, data.fields.task_priority, data.user_id, data.fields.responsible_user, data.fields.task_status, data.fields.deadline], 'run');
    taskID = data.fields.task_id
    console.log("The task ID is:", taskID);
  } catch (error) {
    console.error('createNewTask_V01 ERROR: ', error);
    return;
  }
  
  // Добавляем комментарий к задаче (опционально)
  if (data.fields.task_comment) {
    const command2 = `INSERT INTO task_comments (task_id, comment) VALUES (?, ?);`;
    try {
      await queryAsyncWraperParam(command2, [taskID, data.fields.task_comment], 'run');
      console.log("Task comment added successfully");
    } catch (error) {
      console.error('Error adding task comment: ', error);
    }
  }
  
  // Добавляем файлы к задаче (опционально)
  for (let i = 0; i < data.fileNames.length; i++) {
    const file_name = data.fileNames[i];
    // console.log('file', file_name)
    // Если пользователь не ввел название файла и путь, пропускаем файл
    if (!file_name) { //.file_name || !file.file_path
      continue;
    }
    
    const command3 = `INSERT INTO task_files (task_id, file_name, file_path) VALUES (?, ?, ?);`;
    try {
      await queryAsyncWraperParam(command3, [taskID, file_name], 'run');
      console.log(`File ${file_name} added successfully to the task`);
    } catch (error) {
      console.error(`Error adding file ${file_name} to the task: `, error);
    }
  }
}



// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
const createNewTask_V02 = async (data) => {
  console.log('createNewTask_V01', data.fileNames)

  // Начало транзакции
  const beginCommand = `BEGIN TRANSACTION;`;
  try {
    await queryAsyncWraperParam(beginCommand, [], 'run');
    console.log("Transaction started successfully");
  } catch (error) {
    console.error('Error starting transaction: ', error);
    return;
  }

  // Добавляем задачу и получаем task_id
  let taskID;
  const command1 = `
    INSERT INTO tasks (task_id, user_id, task_descript, task_priority, appoint_user, responsible_user, task_status, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const selectCommand = `SELECT last_insert_rowid() AS last_rowid;;`

  try {
    await queryAsyncWraperParam(command1, [data.fields.task_id, data.user_id, data.fields.task_descript, data.fields.task_status, data.fields.task_comment, data.fields.deadline, data.user_id, data.fields.responsible_user], 'run');
    // const result = await queryAsyncWraperParam(selectCommand, [])
    // taskID = result[0].last_rowid
    taskID = data.fields.task_id
    console.log("The task ID is:", taskID);
  } catch (error) {
    console.error('createNewTask_V01 ERROR: ', error);
    return;
  }

  // Добавляем комментарий к задаче (опционально)
  if (data.fields.task_comment) {
    const command2 = `INSERT INTO task_comments (task_id, comment) VALUES (?, ?);`;
    try {
      await queryAsyncWraperParam(command2, [taskID, data.fields.task_comment], 'run');
      console.log("Task comment added successfully");
    } catch (error) {
      console.error('Error adding task comment: ', error);
    }
  }

  // Добавляем файлы к задаче (опционально)
  for (let i = 0; i < data.fileNames.length; i++) {
    const file = data.fileNames[i];
    // Если пользователь не ввел название файла и путь, пропускаем файл
    if (!file) { //.file_name || !file.file_path
      continue;
    }

    const command3 = `INSERT INTO task_files (task_id, file_name, file_path) VALUES (?, ?, ?);`;
    try {
      await queryAsyncWraperParam(command3, [taskID, file.file_name, file.file_path], 'run');
      console.log(`File ${file} added successfully to the task`);
    } catch (error) {
      console.error(`Error adding file ${file.file_name} to the task: `, error);
    }
  }

  // Завершаем транзакцию
  const commitCommand = `COMMIT;`;
  try {
    await queryAsyncWraperParam(commitCommand, [], 'run');
    console.log("Transaction committed successfully");
  } catch (error) {
    console.error('Error committing transaction: ', error);
  }
}

// ------------------------------ TASK STUS CHANGED----------


module.exports = {
  createNewTask,

  getUserResponceTasks,
  getUserAppointTasks,

  updateTaskStatusAccept,
  getNewUserTasks,

  updateTaskReviewStatus,
  getReviewTasks,

  updateTaskRevieClosed,
  getClosedTasks,

  createNewTask_V01,
  getTasksComents,
}