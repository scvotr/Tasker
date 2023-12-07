const {
  queryAsyncWraperParam
} = require("../createDatabase")

const fs = require("fs")
const path = require("path")


const createNewVenchel = async (data) => {
  const command = `
    INSERT INTO venchels (id, position, type, pos_num, model, location, power, width, height)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `
  try {
    await queryAsyncWraperParam(
      command,
      [
        data.id,
        data.position,
        data.type,
        data.pos_num,
        data.model,
        data.location,
        data.power,
        data.width,
        data.height,
      ]
    )
  } catch (error) {
    console.error("createNewVenchel ERROR: ", error)
    return;
  }
}
const createNewVenchel_V02 = async (data) => {
  console.log('>>>>>>>>>>>>', data)
  const command = `
    INSERT INTO venchels (id, position, type, pos_num, model, location, power, width, height, department_id, sector_id, workshop_id)
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
      ],
      "run" //?
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
  try {
    const result = await queryAsyncWraperParam("SELECT * FROM venchels");
    return result;
  } catch (error) {
    console.error("getAllVenchels ERROR: ", error);
    return [];
  }
};

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
    DELETE FROM venchels WHERE id = ?
  `
  try {
    await queryAsyncWraperParam(command, [id])
  } catch (error) {
    console.error("removeVenchel ERROR: ", error)
  }
};

module.exports = {
  createNewVenchel,
  createNewVenchel_V02,
  getAllVenchels,
  removeVenchel,
  getAllVenchelsByDep,
}