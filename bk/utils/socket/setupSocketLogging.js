const fs = require('fs');

const logMessage = (data, actionTypeName) => {
  const now = new Date()
  const currentDate = `${now.getDate()} ${now.getFullYear()}`
  const currentTime  = now.toLocaleTimeString()
  return `\n Пользователь ID: ${data.id} ${data.name} ${currentDate} ${currentTime} ${actionTypeName};\n`
}

function logConnectionUserData(socket) {
  socket.on('userConnect', (data) => {
    const userData = {
      id: data.userId,
      name: data.userName,
    };
    fs.appendFile('socket_logs.txt', logMessage(userData, 'что то отправил'), (err) => {
      if (err) throw err;
      console.log('Данные о подключении пользователя записаны в файл');
    });
  })
}

function logConnection(socket) {
  fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'подключился'), (err) => {
    if (err) throw err
    console.log('Данные пользователя записаны в файл')
  })
  // Дополнительная логика при подключении пользователя
}

function logDisconnection(socket) {
  fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'отключился'), (err) => {
    if (err) throw err;
    console.log(logMessage);
  });
  // Дополнительная логика при отключении пользователя
}

function setupSocketLogging(io) {
  io.on('connection', (socket) => {
    logConnection(socket);
    logConnectionUserData(socket)
    socket.on('disconnect', () => {
      logDisconnection(socket);
    });
    // Другие обработчики событий и логика
  });
}

module.exports = setupSocketLogging;