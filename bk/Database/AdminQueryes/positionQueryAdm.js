const { queryAsyncWraperParam } = require('../createDatabase')

const createNewPosition = async (fields) => {
  const {name, dep_id, subDep_name } = fields;
  const command = `INSERT INTO positions (name,  department_id, subdepartment_id) VALUES (?, ?, ?)`;
  await queryAsyncWraperParam(command, [name, dep_id, subDep_name], 'run');
}


module.exports = {
  createNewPosition,
}