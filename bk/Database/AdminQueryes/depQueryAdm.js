const { queryAsyncWraper, queryAsyncWraperParam } = require('../../Database/createDatabase')

// !31.08.23----------------
const createNewDep = async (dep_name) => {
  const { depName } = dep_name;
  const command = `INSERT INTO departments (name) VALUES (?)`;
  await queryAsyncWraperParam(command, [depName], 'run');
}
const removeDep = async (dep_id) => {
  const command = 'DELETE FROM departments WHERE id = ?';
  await queryAsyncWraperParam(command, [dep_id], 'run');
}

module.exports = {
  createNewDep,
  removeDep,
}