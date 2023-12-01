const {
  queryAsyncWraperParam
} = require("../createDatabase")

const fs = require("fs")
const path = require("path")


const createNewVenchel = async (data) => {
  const command = `
    INSERT INTO equipment (id, position, type, pos_num, model, location, power, width, height)
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
    INSERT INTO equipment (id, position, type, pos_num, model, location, power, width, height)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
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
      // console.log('file', file_name)
      // Если пользователь не ввел название файла и путь, пропускаем файл
      if (!file_name) {
        //.file_name || !file.file_path
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
    const result = await queryAsyncWraperParam("SELECT * FROM equipment");
    return result;
  } catch (error) {
    console.error("getAllVenchels ERROR: ", error);
    return [];
  }
};

const removeVenchel = async (id) => {
  command = `
    DELETE FROM equipment WHERE id = ?
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
}