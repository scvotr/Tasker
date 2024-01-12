'use strict'
const http = require("http");

const { handleDefaultRoute } = require("./routes/handleDefaultRoute");
const { handleOptionsRequest } = require("./routes/handleOptionsRequest");
const { handleAuthRoutes } = require("./routes/handleAuthRoutes");
const { handleAdminRoutes } = require("./routes/handleAdminRoutes");
const { handleOrgStructRoutes } = require("./routes/handleOrgStructRoutes");
const { handleTaskRoutes } = require("./routes/handleTaskRoutes");
const { handleUserRoutes } = require("./routes/handleUserRoutes");
const { handleVenchelRoutes } = require("./routes/handleVenchelRoutes");

const routeHandlers = [
  { prefix: "/auth", handler: handleAuthRoutes },
  { prefix: "/admin", handler: handleAdminRoutes },
  { prefix: "/orgStruct", handler: handleOrgStructRoutes },
  { prefix: "/tasks", handler: handleTaskRoutes },
  { prefix: "/user", handler: handleUserRoutes },
  { prefix: "/venchel", handler: handleVenchelRoutes },
];

const server = http.createServer(async (req, res) => {
  try {
    const { url, method } = req;
    res.setHeader("Access-Control-Allow-Origin", "*"); // https://www.youtube.com/watch?v=OoB2epEgbTU
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    if (method === "OPTIONS") {
      handleOptionsRequest(req, res);
    } else {
      let routeHandled = false;
      for (const { prefix, handler } of routeHandlers) {
        if (url.startsWith(prefix)) {
          await handler(req, res);
          routeHandled = true;
          break;
        }
      }
      if (!routeHandled) {
        handleDefaultRoute(req, res);
      }
    }
  } catch (error) {
    console.log("server-catch: ", error);
  }
});

server.on("error", (error) => {
  console.log("server.on ", error);
});

server.listen({ host: "localhost", port: 3070 }, () => {
// server.listen({ host: "192.168.8.109", port: 3050 }, () => {
  const address = server.address();
  console.log(`Сервер запущен на адресе ${address.address}:${address.port}`);
});