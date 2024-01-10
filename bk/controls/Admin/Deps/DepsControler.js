const {
  createNewDep,
  removeDep
} = require('../../../Database/AdminQueryes/depQueryAdm')

const { createNewSubDep } = require('../../../Database/AdminQueryes/subDepQueryAdm')
const { createNewPosition } = require('../../../Database/AdminQueryes/positionQueryAdm')

class DepsControler {
  async createNewDep(req, res) {
    try {
      const authDecodeUserData = req.user;
      const userData = JSON.parse(authDecodeUserData.payLoad);
      console.log('createNewDep', userData)
      if (authDecodeUserData.role !== "admin") {
        return res.end(
          JSON.stringify({
            updateUserData: "Нет прав на доступ",
          })
        );
      }
      await createNewDep(userData);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "createNewDep - ERROR",
        })
      );
    }
  }
  async removeDep(req, res) {
    try {
      const authDecodeUserData = req.user;
      const userData = JSON.parse(authDecodeUserData.payLoad);
      if (authDecodeUserData.role !== "admin") {
        return res.end(
          JSON.stringify({
            updateUserData: "Нет прав на доступ",
          })
        );
      }
      await removeDep(userData);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "removeDep - ERROR",
        })
      );
    }
  }
  async createNewSubDep(req, res) {
    try {
      const fields = req.user.payLoad.fields
      if (req.user.role !== "admin") {
        return res.end(
          JSON.stringify({
            updateUserData: "Нет прав на доступ",
          })
          );
        }
        console.log(fields)
        await createNewSubDep(fields)
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "createNewSubDep - ERROR",
        })
      );
    }
  }
  async createNewPosition(req, res) {
    try {
      const fields = req.user.payLoad.fields
      if (req.user.role !== "admin") {
        return res.end(
          JSON.stringify({
            updateUserData: "Нет прав на доступ",
          })
          );
        }
        console.log(fields)
        await createNewPosition(fields)
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "createNewSubDep - ERROR",
        })
      );
    }
  }
}

module.exports = new DepsControler();