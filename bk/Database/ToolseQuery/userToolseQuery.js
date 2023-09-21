const {
    queryAsyncWraper,
    queryAsyncWraperParam
  } = require('../createDatabase')

// 12_06_23 поиск обновленного пользователя
const fineUserById = async(user_id)=>{
  return await queryAsyncWraper(`SELECT * FROM users WHERE id = '${user_id}'`);
}
const getUserByLgPs = async(lg, ps)=>{
  return await queryAsyncWraper(`SELECT * FROM users WHERE name = '${lg}' AND password = '${ps}'`);
}
const chekUserLoginName = async (lg) => {
  return await queryAsyncWraper(`SELECT * FROM users WHERE name = '${lg}'`);
}
const checkUserEmail = async (eml) => {
  return await queryAsyncWraper(`SELECT * FROM users WHERE email = '${eml}'`);
}
const createNewUserParams = async (user) => {
  const { name, email, password, role, department_id, subdepartment_id, position_id } = user;
  const command = `INSERT INTO users(name, email, password, role, department_id, subdepartment_id, position_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  await queryAsyncWraperParam(command, [ name, email, password, role || 'user', department_id || 1, subdepartment_id || 1, position_id || 1 ], 'run',)
}

module.exports = {
  fineUserById,
  getUserByLgPs,
  chekUserLoginName,
  checkUserEmail,
  createNewUserParams,
}