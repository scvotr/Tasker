const {queryAsyncWraperParam} = require("../createDatabase")

const fs = require("fs")
const path = require("path")


const createNewVenchel = async(data) => {
  console.log('createNewVenchel', data)
  const command = `
    INSERT INTO equipment (id, position, type, pos_num, model, location, power, width, height)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
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
    console.error("createNewVenchel ERROR: ", error);
    return;
  }
}

module.exports = {
  createNewVenchel,
}