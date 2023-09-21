const {
  queryAsyncWraper,
  queryAsyncWraperParam
} = require('../../Database/createDatabase')
const fs = require("fs");
const path = require("path");

const getAllUsers = async () => {
  try {
    const command = `
      SELECT 
      users.id, 
        users.name, 
        users.email, 
        users.role, 
        departments.id AS department_id,
        departments.name AS department, 
        subdepartments.id AS subdepartment_id,
        subdepartments.name AS subdepartment,
        positions.id AS position_id,
        positions.name AS position
      FROM 
        users 
        LEFT JOIN departments ON users.department_id = departments.id
        LEFT JOIN subdepartments ON users.subdepartment_id = subdepartments.id
        LEFT JOIN positions ON users.position_id = positions.id;
    `;
    return await queryAsyncWraperParam(command, [], 'all');
  } catch (error) {
    console.error("Error get all users:", error);
  }
}

const updateUserParams = async (user) => {
  const {
    id,
    name,
    email,
    role,
    department_id,
    subdepartment_id,
    position_id
  } = user;
  const command = `UPDATE users SET name = ?, email = ?, role = ?, department_id = ?, subdepartment_id = ?, position_id = ? WHERE id = ?`;
  await queryAsyncWraperParam(command, [name, email, role, department_id, subdepartment_id, position_id, id], 'run');
}

// 12_06_23 поиск обновленного пользователя
const fineUserById = async (user_id) => {
  return await queryAsyncWraper(`SELECT * FROM users WHERE id = '${user_id}'`);
}


//!-------------------------------16-080-23----------------------------------
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
const getTaskThumbnailFiles = async (allTasks) => {
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
          file_path = `${currentDirectory}/uploads/${task.task_id}/thumbnail_${file_name}`;
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

const getAllTasks = async () => {
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
    GROUP BY t.task_id`;

  try {
    const taskFiles = await queryAsyncWraperParam(command);
    return await getTaskThumbnailFiles(taskFiles);
  } catch (error) {
    console.error("getAllUserTasksFiles ERROR: ", error);
  }
};

module.exports = {
  getAllUsers,
  getAllTasks,
  updateUserParams,
  fineUserById,
}