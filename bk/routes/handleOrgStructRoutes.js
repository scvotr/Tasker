const OrgStructControler = require('../controls/OrgStruct/OrgStructControler');
const { handleDefaultRoute } = require("../routes/handleDefaultRoute");
const { protectRouteTkPl } = require("../utils/protectRouteTkPl");

const routeHandlers = {
  "/orgStruct/getDepartments": OrgStructControler.getDepartments,
  "/orgStruct/getSubDepartments": OrgStructControler.getSubDepartments,
  "/orgStruct/getPositions": OrgStructControler.getPositions,
};

const handleOrgStructRoutes = async (req, res) => {
  const { url, method } = req;
  
  try {
    if (url.startsWith("/orgStruct")) {
      if (method === "POST") {
        const routeHandler = routeHandlers[url];
        if (routeHandler) {
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
    res.end(JSON.stringify({ error: "handleOrgStructRoutes - ОШИБКА" }));
  }
};

module.exports = {
  handleOrgStructRoutes
};
