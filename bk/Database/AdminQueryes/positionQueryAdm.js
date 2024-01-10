const { queryAsyncWraperParam } = require('../createDatabase')

const createNewPosition = async (fields) => {
  const { name, dep_id, subDep_id } = fields;
  console.log(name, dep_id, subDep_id)
  const command = `INSERT INTO positions (name,  department_id, subdepartment_id) VALUES (?, ?, ?)`;
  await queryAsyncWraperParam(command, [name, dep_id, subDep_id], 'run');
}


module.exports = {
  createNewPosition,
}