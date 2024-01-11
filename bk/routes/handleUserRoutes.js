const UserControler = require('../controls/User/UserControler');
const { handleDefaultRoute } = require("../routes/handleDefaultRoute");
const { protectRouteTkPl } = require("../utils/protectRouteTkPl");

const routeHandlers = {
  "/user/getUserIdByPosition": UserControler.getUserIdByPosition,
  "/user/getUsersBySubDepId": UserControler.getUsersBySubDepId,
  "/user/getUserIdByDep": UserControler.getUserIdByPosition,
};

const handleUserRoutes = async (req, res) => {
  const { url, method } = req;
  console.log('handleUserRoutes', url, method );
  
  try {
    if (url.startsWith("/user")) {
      const routeHandler = routeHandlers[url];
      if (routeHandler) {
        if (method === "POST") {
          await protectRouteTkPl(routeHandler)(req, res);
        } else if (method === "GET") {
          await protectRouteTkPl(routeHandler)(req, res);
        } else {
          handleDefaultRoute(req, res);
        }
      } else {
        handleDefaultRoute(req, res);
      }
    } else {
      handleDefaultRoute(req, res);
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "handleTaskRoutes - ERROR" }));
  }
};

module.exports = { handleUserRoutes };
