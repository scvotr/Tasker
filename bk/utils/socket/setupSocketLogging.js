const fs = require('fs');
const path = require('path')

const currentDirectory = process.cwd()
console.log('currentDirectory', currentDirectory)

// function logConnection(socket) {
//   const logMessage = `Пользователь ${socket.id} подключился\n`;
//   fs.appendFile('socket_logs.txt', logMessage, (err) => {
//     if (err) throw err;
//     console.log(logMessage);
//   });
// }


function logConnection(socket) {
  socket.on('userConnect', (data) => {
    const userId = data.userId
    const userName = data.userName

    const now = new Date();
    const datePart = `${now.getDate()} ${now.getFullYear()}`;
    const timePart = now.toLocaleTimeString();

    const logMsg = `\n Пользователь ID: ${userId} ${userName} ${datePart} ${timePart} подключился;\n`;
    fs.appendFile('socket_logs.txt', logMsg, (err) => {
      if(err) throw err
      console.log('Данные пользователя записаны в файл')
    })
  })
}

function logDisconnection(socket) {
  const disconnectLogMessage = `\n Пользователь ${socket.id} отключился\n`;
  fs.appendFile('socket_logs.txt', disconnectLogMessage, (err) => {
    if (err) throw err;
    console.log(disconnectLogMessage);
  });
  // Дополнительная логика при отключении пользователя
}

function setupSocketLogging(io) {
  io.on('connection', (socket) => {
    logConnection(socket);

    socket.on('disconnect', () => {
      logDisconnection(socket);
    });

    // Другие обработчики событий и логика

  });
}

module.exports = setupSocketLogging;
