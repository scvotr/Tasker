'use strict'
const http = require("http");
const socketIo = require('socket.io');
const { setupSocket, pollDatabaseForUserTasks } = require('./socketService')
const setupSocketLogging = require('./utils/socket/setupSocketLogging')
const logger = require('./utils/logger/logger')
const initialSQLiteFile = require('./Database/initialSQLiteFile')

// const sqlite3 = require('sqlite3').verbose()
// new sqlite3.Database('../database2.db')

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

initialSQLiteFile('../database55.db')

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
    logger.error(`Server : ${error}`)
    console.log("server-catch: ", error);
  }
});

server.on("error", (error) => {
  console.log("server.on ", error);
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
setupSocket(io);
setupSocketLogging(io)  

server.listen({ host: "localhost", port: 3070 }, () => {
// server.listen({ host: "192.168.8.109", port: 3050 }, () => {
  const address = server.address();
  console.log(`Сервер запущен на адресе ${address.address}:${address.port}`);
});
