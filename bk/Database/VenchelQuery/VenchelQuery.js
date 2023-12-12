const {
  queryAsyncWraperParam
} = require("../createDatabase")

const fs = require("fs")
const path = require("path")
const {getThumbnailFiles} = require("../TasksQuery/TasksQuery")

const createNewVenchel = async (data) => {
  const command = `
    INSERT INTO venchels (venchel_id, position, type, pos_num, model, location, power, width, height, department_id, sector_id, workshop_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `
  try {
    await queryAsyncWraperParam(
      command,
      [
        data.fields.venchel_id,
        data.fields.position,
        data.fields.type,
        data.fields.pos_num,
        data.fields.model,
        data.fields.location,
        data.fields.power,
        data.fields.width,
        data.fields.height,
        data.fields.department_id,
        data.fields.sector,
        data.fields.workshop_id,
      ]
    )

    venchelID = data.fields.venchel_id //?
  } catch (error) {
    console.error("createNewVenchel ERROR: ", error)
    return;
  }
  if (data.fileNames) {
    for (let i = 0; i < data.fileNames.length; i++) {
      const file_name = data.fileNames[i];
      if (!file_name) {
        continue;
      }
      const command2 = `INSERT INTO venchel_files (venchel_id, file_name, file_path) VALUES (?, ?, ?);`;
      try {
        await queryAsyncWraperParam(command2, [venchelID, file_name], "run");
        console.log(`File ${file_name} added successfully to the venchel`);
      } catch (error) {
        console.error(`Error adding file ${file_name} to the task: `, error);
      }
    }
  }
}

const getAllVenchels = async () => {
  // без алиаса (AS V) v. тоже работает
  const command = `
    SELECT
      v.venchel_id,
      v.position,
      v.type,
      v.pos_num,
      v.model,
      v.location,
      v.power,
      v.width,
      v.height,
      v.department_id,
      d.name AS department_name,
      v.sector_id,
      v.workshop_id,
      w.name AS workshop_name,
      GROUP_CONCAT(f.file_name, '|') AS file_names
    FROM venchels AS v
      LEFT JOIN departments AS d ON v.department_id = d.id
      LEFT JOIN workshops AS w ON v.workshop_id = w.id
      LEFT JOIN venchel_files as f ON v.venchel_id = f.venchel_id
    GROUP BY v.venchel_id  
  `
  // GROUP BY v.venchel_id гарантирует, что для каждой записи в таблице venchels будет возвращена соответствующая группа записей из других таблиц.
  try {
    const appendFile = await queryAsyncWraperParam(command);
    return await getThumbnailFiles(appendFile, 'venchels')
  } catch (error) {
    console.error("getAllVenchels ERROR: ", error);
    return [];
  }
}

const getAllVenchelsByDep = async (dep_id) => {
  const command = `SELECT * FROM venchels WHERE department_id = ?;`
  try {
    return await queryAsyncWraperParam(command, [dep_id])
  } catch (error) {
    console.log('DB ERROR:', error);
    throw error;
  }
};

const removeVenchel = async (id) => {
  const command = `
    DELETE FROM venchels WHERE venchel_id = ?
  `
  try {
    await queryAsyncWraperParam(command, [id])
  } catch (error) {
    console.error("removeVenchel ERROR: ", error)
  }
};

module.exports = {
  createNewVenchel,
  getAllVenchels,
  removeVenchel,
  getAllVenchelsByDep,
}