const {
  queryAsyncWraper,
  queryAsyncWraperParam,
} = require("../createDatabase");

const createTokenParams = async (userId, token) => {
  const command = `INSERT INTO tokens(user_id, token) VALUES (?, ?)`;
  await queryAsyncWraperParam(command, [userId, token], `run`);
};
// 12_06_23 обновление токена,  обновленного пользователя
const updateTokenParams = async (userId, token) => {
  const command = `UPDATE tokens SET token = ? WHERE user_id = ?`;
  await queryAsyncWraperParam(command, [token, userId], `run`);
};

const getTokenByUserId = async (user_id) => {
  const command = `SELECT * FROM tokens WHERE user_id = ?`;
  return await queryAsyncWraperParam(command, [user_id]);
};

const getTokenByValueParams = async (tokenValue) => {
  const command = `SELECT * FROM tokens WHERE token = ?`;
  return await queryAsyncWraperParam(command, [tokenValue]);
};

module.exports = {
  createTokenParams,
  updateTokenParams,
  getTokenByUserId,
  getTokenByValueParams,
};
