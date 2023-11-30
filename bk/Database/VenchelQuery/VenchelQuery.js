const {queryAsyncWraperParam} = require("../createDatabase")

const fs = require("fs")
const path = require("path")


const createNewVenchel = async(data) => {
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

const getAllVenchels = async () => {
  try {
    const result = await queryAsyncWraperParam("SELECT * FROM equipment");
    return result;
  } catch (error) {
    console.error("getAllVenchels ERROR: ", error);
    return [];
  }
};

module.exports = {
  createNewVenchel,
  getAllVenchels,
}