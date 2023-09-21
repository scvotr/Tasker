const { getPostDataset } = require("../../utils/getPostDataset");

const {
  fineUserById,
  getUserByLgPs,
  chekUserLoginName,
  checkUserEmail,
  createNewUserParams,
} = require("../../Database/ToolseQuery/userToolseQuery");

const {
  createTokenParams,
  getTokenByUserId,
} = require("../../Database/TokenQuery/TokenQuery");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const HASH_SALT = parseInt(process.env.KEY_SALT);
const SECRET_KEY = process.env.KEY_TOKEN;

class AuthControler {
  async registration(req, res) {
    try {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const postPayload = await getPostDataset(req);
      const postData = JSON.parse(postPayload);
      const { name, email, password } = postData;
      const isEmpty = name && email && password;
      if (!isEmpty)
        return res.end(JSON.stringify({ Registrtaion: "Пустые поля" }));
      const checkName = await chekUserLoginName(name);
      if (checkName.length) {
        const message = {
          Registrtaion: "Такой пользователь уже зарегистрирован",
        };
        res.statusCode = 409;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(message));
        return;
      }
      const chekEmail = await checkUserEmail(email);
      if (chekEmail.length)
        return res.end(JSON.stringify({ Registration: "Email уже есть." }));
      const hashedPassword = await bcrypt.hash(password, HASH_SALT);
      const userData = { ...postData, password: hashedPassword };
      await createNewUserParams(userData);
      const arrDataUser = await getUserByLgPs(postData.name, hashedPassword);
      const objDataUser = arrDataUser.find((item) => item);
      // console.log('objDataUser', objDataUser) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const token = jwt.sign(objDataUser, SECRET_KEY); //генрируем токен
      res.setHeader("Access-Control-Expose-Headers", "Authorization");
      res.setHeader("Authorization", `Bearer ${token}`);
      await createTokenParams(objDataUser.id, token);
      res.statusCode = 201;
      res.end(JSON.stringify({ Registration: "Пользователь зарегистрирован" }));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Ошибка при регистрации пользователя." })
      );
    }
  }
  async login(req, res) {
    try {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const postPayload = await getPostDataset(req);
      // перенести парсинг в getPostDataset
      const postData = JSON.parse(postPayload);
      const { name, password } = postData;
      const isEmpty = name && password;
      if (!isEmpty)
        return res.end(JSON.stringify({ Authtorisation: "Пустые поля" }));
      const authUserName = await chekUserLoginName(name);
      if (!authUserName.length)
        return res.end(
          JSON.stringify({ Authtorisation: "Пользователь не найден" })
        );
      const objDataUser = authUserName.find((item) => item);
      const isPasswordMatched = await bcrypt.compare(
        password,
        objDataUser.password
      );
      if (!isPasswordMatched)
        return res.end(JSON.stringify({ Authtorisation: "Пароль не верный" }));
      const arrDataToren = await getTokenByUserId(objDataUser.id);
      const objDataToken = arrDataToren.find((item) => item);
      //12_06_23 получаю текущего пользовтеля
      const arrCurrentUser = await fineUserById(objDataUser.id);
      const objCurrentUser = arrCurrentUser.find((item) => item);
      res.setHeader("Access-Control-Expose-Headers", "Authorization");
      res.setHeader("Authorization", `Bearer ${objDataToken.token}`);
      res.end(
        JSON.stringify({
          Authorization: "Авторизация прошла успешно.",
          name: objDataUser.name,
          role: objDataUser.role,
          id: objDataUser.id,
          dep: objCurrentUser.department_id,
          subDep: objCurrentUser.subdepartment_id,
          position: objCurrentUser.position_id,
        })
      );
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Ошибка при аутентификации пользователя." })
      );
    }
  }
}

module.exports = new AuthControler();
