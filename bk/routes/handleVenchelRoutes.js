'use strict'

const VenchelControler = require("../controls/Venchel/VenchelControler")
const { handleDefaultRoute } = require("../routes/handleDefaultRoute");
const { protectRouteTkPl } = require("../utils/protectRouteTkPl");

const routeHandlers = {
  "/venchel/addNewVenchel": VenchelControler.addNewVenchel,
  "/venchel/getAllVenchels": VenchelControler.getAllVenchels,
  "/venchel/removeVenchel": VenchelControler.removeVenchel,
  "/venchel/updateNewVenchel": VenchelControler.updateNewVenchel,
  "/venchel/getAllVenchelsByDep": VenchelControler.getAllVenchelsByDep,
  "/venchel/getVenchelsFile": VenchelControler.getVenchelsFile,
  "/venchel/getFullFileContent": VenchelControler.getFullFileContent,
};

const handleVenchelRoutes = async (req, res) => {
  const { url, method } = req;
  // console.log('handleVenchelRoutes', url, method );
  
  try {
    if (url.startsWith("/venchel")) {
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
    res.end(JSON.stringify({ error: "handleVenchelRoutes - ERROR" }));
  }
};

module.exports = { handleVenchelRoutes };