const { queryAsyncWraperParam } = require('../createDatabase')

const createNewSubDep = async (fields) => {
  const { dep_id, subDep_name } = fields;
  const command = `INSERT INTO subdepartments (department_id, name) VALUES (?, ?)`;
  await queryAsyncWraperParam(command, [dep_id, subDep_name], 'run');
}


module.exports = {
  createNewSubDep,
}