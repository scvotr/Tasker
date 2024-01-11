const {getUsersBySubDepId} = require('../../Database/UserQuery/userQuery')
class UserControler {
  async getUserIdByPosition(req, res){
    console.log('>>>>>>>>>> getUserIdByPosition')
    try {
      const authDecodeUserData = req.user
      const postPayload = authDecodeUserData.payLoad
      console.log('getUserIdByPosition ID_POSITION', postPayload)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(postPayload))
      res.end()
    } catch (error) {
      console.log(error)
      res.statusCode = 500
      res.end(JSON.stringify({
        error: 'getUserIdByPosition'
      }))
    }
  }    
  async getUsersBySubDepId(req, res){
    try {
      const authDecodeUserData = req.user
      const postPayload = authDecodeUserData.payLoad
      const data = await getUsersBySubDepId(postPayload)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(data))
      res.end()
    } catch (error) {
      console.log(error)
      res.statusCode = 500
      res.end(JSON.stringify({
        error: 'getUsersBySubDepId'
      }))
    }
  }    
}

module.exports = new UserControler()