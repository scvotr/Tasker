const {
  getDepartments,
  getSubDepartments,
  getPositions
} = require('../../Database/OrgStructQuery/OrgStructQuery')
// ! за рефаторить. Вынести в отлеьную функцию fetchData
class OrgStructControler {
  async getDepartments(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = await getDepartments()
      if (data.length === 0) {
        res.statusCode = 204
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
      }
      res.end()
    } catch (error) {
      res.statusCode = 500
      res.end(JSON.stringify({
        error: 'getDepartments'
      }))
    }
  }
  async getSubDepartments(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = await getSubDepartments()
      if (data.length === 0) {
        res.statusCode = 204
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
      }
      res.end()
    } catch (error) {
      res.statusCode = 500
      res.end(JSON.stringify({
        error: 'getDepartments'
      }))
    }
  }
  async getPositions(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = await getPositions()
      if (data.length === 0) {
        res.statusCode = 204
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
      }
      res.end()
    } catch (error) {
      res.statusCode = 500
      res.end(JSON.stringify({
        error: 'getDepartments'
      }))
    }
  }
}

module.exports = new OrgStructControler()

// ! REFACTORING TO
// const {
//   getDepartments,
//   getSubDepartments,
//   getPositions
// } = require('../../Database/OrgStructQuery/OrgStructQuery')

// class OrgStructControler {
//   async fetchData(req, res, getDataFn) {
//     try {
//       const authDecodeUserData = req.user
//       const data = await getDataFn()
//       if (data.length === 0) {
//         res.statusCode = 204
//       } else {
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'application/json')
//         res.write(JSON.stringify(data))
//       }
//       res.end()
//     } catch (error) {
//       res.statusCode = 500
//       res.end(JSON.stringify({
//         error: 'getDepartments'
//       }))
//     }
//   }

//   async getDepartments(req, res) {
//     await this.fetchData(req, res, getDepartments)
//   }

//   async getSubDepartments(req, res) {
//     await this.fetchData(req, res, getSubDepartments)
//   }

//   async getPositions(req, res) {
//     await this.fetchData(req, res, getPositions)
//   }
// }

// module.exports = new OrgStructControler()
