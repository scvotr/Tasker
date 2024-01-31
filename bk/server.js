'use strict'
const http = require("http");
const { setupSocket } = require('./socketService')
const {socketManager} = require('./utils/socket/socketManager')
const setupSocketLogging = require('./utils/socket/setupSocketLogging')
const logger = require('./utils/logger/logger')
require('dotenv').config();

const {
  executeDatabaseQueryAsync,
} = require ('./Database/dbControler') 

const { handleDefaultRoute } = require("./routes/handleDefaultRoute");
const { handleOptionsRequest } = require("./routes/handleOptionsRequest");
const { handleAuthRoutes } = require("./routes/handleAuthRoutes");
const { handleAdminRoutes } = require("./routes/handleAdminRoutes");
const { handleOrgStructRoutes } = require("./routes/handleOrgStructRoutes");
const { handleTaskRoutes } = require("./routes/handleTaskRoutes");
const { handleUserRoutes } = require("./routes/handleUserRoutes");
const { handleVenchelRoutes } = require("./routes/handleVenchelRoutes");
const { handleDocsRoutes } = require("./routes/handleDocsRouters")

const routeHandlers = [
  { prefix: "/auth", handler: handleAuthRoutes },
  { prefix: "/admin", handler: handleAdminRoutes },
  { prefix: "/orgStruct", handler: handleOrgStructRoutes },
  { prefix: "/tasks", handler: handleTaskRoutes },
  { prefix: "/user", handler: handleUserRoutes },
  { prefix: "/venchel", handler: handleVenchelRoutes },
  { prefix: "/docs", handler: handleDocsRoutes },
];

const server = http.createServer(async (req, res) => {
  try {
    const { url, method } = req;
    res.setHeader("Access-Control-Allow-Origin", "*");
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
    logger.error(`Server-error: ${error}`)
    console.log("server-catch-error: ", error);
  }
});

server.on("error", (error) => {
  console.log("server.on ", error);
});

const io = socketManager.init(server);
setupSocket(io);
setupSocketLogging(io)  

const host = process.env.HOST || "localhost"; 
const port = process.env.PORT || 3070;
server.listen({ host, port }, () => {
  const address = server.address();
  console.log(`Сервер запущен на адресе ${address.address}:${address.port}`);
});

// $env:HOST="192.168.8.102"; $env:PORT="3050"; node .\server.js // win PowerShell 
// $env:HOST="localhost"; $env:PORT="3070"; node .\server.js     // win PowerShell 
// export HOST=192.168.8.102 export PORT=3050 node ./server.js   // Unix и Linux
// export HOST=localhost export PORT=3070 node ./server.js       // Unix и Linux
