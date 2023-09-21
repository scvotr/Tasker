const { createNewDep, removeDep } = require('../../../Database/AdminQueryes/depQueryAdm')

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
}

module.exports = new DepsControler();