const AuthControler = require("../controls/Auth/AuthControler");
const { handleDefaultRoute } = require("../routes/handleDefaultRoute");

const routeHandlers = {
  "/auth/registration": AuthControler.registration,
  "/auth/login": AuthControler.login,
};

const handleAuthRoutes = async (req, res) => {
  const { url, method } = req;
  
  try {
    if (url.startsWith("/auth")) {
      const routeHandler = routeHandlers[url];
      if (routeHandler) {
        if (method === "POST") {
          await routeHandler(req, res);
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
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "handleAuthRoutes - ERROR" }));
  }
};

module.exports = { handleAuthRoutes };
