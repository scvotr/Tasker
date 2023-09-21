const {
  getAllUsers,
  updateUserParams,
  fineUserById,
  getAllTasks,
} = require("../../../Database/AdminQueryes/userQueryAdm");

const {
  updateTokenParams
} = require("../../../Database/TokenQuery/TokenQuery")

const con_err = (data) => console.error(data);

const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.KEY_TOKEN;

class UserControler {
  async getAllUsers(req, res) {
    try {
      const authDecodeUserData = req.user;
      // const user_id = authDecodeUserData.id;// если нужно ID пользовтеля
      if (authDecodeUserData.role !== "admin") {
        return res.end(
          JSON.stringify({
            getAllUsers: "Нет прав на доступ",
          })
        );
      }
      const data = await getAllUsers();
      if (data.length === 0) {
        res.statusCode = 204;
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(data));
      }
      res.end();
    } catch (error) {
      con_err(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "getAllUsers",
        })
      );
    }
  }
  // !31/08/23
  async getAllTasks(req, res) {
    try {
      const authDecodeUserData = req.user;
      // const user_id = authDecodeUserData.id;// если нужно ID пользовтеля
      if (authDecodeUserData.role !== "admin") {
        return res.end(
          JSON.stringify({
            getAllUsers: "Нет прав на доступ",
          })
        );
      }
      const data = await getAllTasks();
      if (data.length === 0) {
        res.statusCode = 204;
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(data));
      }
      res.end();
    } catch (error) {
      con_err(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "getAllTasks",
        })
      );
    }
  }

  async updateUserData(req, res) {
    try {
      const authDecodeUserData = req.user;
      const userData = JSON.parse(authDecodeUserData.payLoad);
      console.log('userData', userData)
      if (authDecodeUserData.role !== "admin") {
        return res.end(
          JSON.stringify({
            updateUserData: "Нет прав на доступ",
          })
        );
      }
      await updateUserParams(userData);
      // 12_06_23 ОБНОВЕЛНИЕ ТОКЕНА
      const arrUpdatedDataUser = await fineUserById(userData.id); // Ищем обновленого пользователя
      const objUpdatedDataUser = arrUpdatedDataUser.find((item) => item);
      const token = jwt.sign(objUpdatedDataUser, SECRET_KEY); //генрируем токен
      await updateTokenParams(objUpdatedDataUser.id, token); // Обновляем токен
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify("Updated - OK"));
      res.end();
    } catch (error) {
      con_err(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "updateUserData - ERROR",
        })
      );
    }
  }
}

module.exports = new UserControler();