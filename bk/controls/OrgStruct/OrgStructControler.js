const {
  getDepartments,
  getDepartmentsFrom,
  getSubDepartments,
  getPositions,
  getWorkshopsByDepID,
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
  async getDepartmentsFrom(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = await getDepartmentsFrom()
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
        error: 'getPositions'
      }))
    }
  }
  async getWorkshopsByDepID(req, res) {
    try {
      const dep_id = req.user.payLoad
      const data = await getWorkshopsByDepID(dep_id)
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
        error: 'getWorkshopsByDepID'
      }))
    }
  }
}

module.exports = new OrgStructControler()


// class OrgStructControler {
//   async handleResponse(req, res, getData) {
//     try {
//       const authDecodeUserData = req.user
//       const data = await getData()
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
//         error: error.message
//       }))
//     }
//   }

//   async getDepartments(req, res) {
//     await this.handleResponse(req, res, getDepartments)
//   }

//   async getDepartmentsFrom(req, res) {
//     await this.handleResponse(req, res, getDepartmentsFrom)
//   }

//   async getSubDepartments(req, res) {
//     await this.handleResponse(req, res, getSubDepartments)
//   }

//   async getPositions(req, res) {
//     await this.handleResponse(req, res, getPositions)
//   }
// }

// module.exports = new OrgStructControler()

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
