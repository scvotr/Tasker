const fs = require('fs');
/**
 * @description
 * EN: Generates a log message with user data and the type of action performed.
 * RU: Генерирует сообщение журнала с данными пользователя и типом выполненного действия.
 *
 * @param {Object} data - The object containing the user's data.
 * EN: The unique identifier of the user.
 * RU: Уникальный идентификатор пользователя.
 * @param {string} data.id - The unique identifier of the user.
 * EN: The name of the user.
 * RU: Имя пользователя.
 * @param {string} data.name - The name of the user.
 * EN: The name of the action performed by the user.
 * RU: Название выполняемого пользователем действия. 
 * @param {string} actionTypeName - The name of the action performed by the user.
 * @returns {string}
 * EN: A formatted log message containing information about the user and the action.
 * RU: Форматированное сообщение журнала, содержащее информацию о пользователе и действии.
 */
const logMessage = (data, actionTypeName) => {
  const now = new Date()
  const currentDate = `${now.getDate()} ${now.getFullYear()}`
  const currentTime = now.toLocaleTimeString()
  return `\n Пользователь ID: ${data.id} ${data.name} ${currentDate} ${currentTime} ${actionTypeName};\n`
}
/**
 * Attaches a listener for user connection events on the socket.
 * Logs user connection data by appending it to a file.
 *
 * @param {Object} socket - The socket instance for the current connection.
 */
function logConnectionUserData(socket) {
  socket.on('userConnect', (data) => {
    const userData = {
      id: data.userId,
      name: data.userName,
    };
    fs.appendFile('socket_logs.txt', logMessage(userData, 'что то отправил'), (err) => {
      if (err) {
        console.log('logConnectionUserData', err)
        throw err
      }
    });
  })
}
/**
 * Logs the basic connection data for any socket connection.
 *
 * @param {Object} socket - The socket instance for the current connection.
 */
function logConnection(socket) {
  fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'подключился'), (err) => {
    if (err) {
      console.log('logConnection', err)
      throw err
    }
  })
  // Дополнительная логика при подключении пользователя
}
/**
 * Logs a disconnection message for a user.
 * @param {Object} socket - The socket object representing the user connection.
 */
function logDisconnection(socket) {
  fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'отключился'), (err) => {
    if (err) {
      console.log('logDisconnection', err)
      throw err
    }
  });
  // Дополнительная логика при отключении пользователя
}
/**
 * Sets up logging for all socket events.
 * @param {Object} io - The main socket.io object to set up event listeners on.
 */
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

// !------------------------------------------------------


// const logMessage = (data, actionTypeName) => {
//   const now = new Date()
//   const currentDate = `${now.getDate()} ${now.getFullYear()}`
//   const currentTime = now.toLocaleTimeString()
//   return `\n Пользователь ID: ${data.id} ${data.name} ${currentDate} ${currentTime} ${actionTypeName};\n`
// }

// function logConnectionUserData(socket) {
//   socket.on('userConnect', (data) => {
//     const userData = {
//       id: data.userId,
//       name: data.userName,
//     };
    // fs.appendFile('socket_logs.txt', logMessage(userData, 'что то отправил'), (err) => {
    //   if (err) throw err;
    //   console.log('Данные о подключении пользователя записаны в файл');
//     });
//   })
// }

// function logConnection(socket) {
//   fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'подключился'), (err) => {
//     if (err) throw err
//     console.log('Данные пользователя записаны в файл')
//   })
//   // Дополнительная логика при подключении пользователя
// }

// function logDisconnection(socket) {
//   fs.appendFile('socket_logs.txt', logMessage(socket.decoded, 'отключился'), (err) => {
//     if (err) throw err;
//     console.log(logMessage);
//   });
//   // Дополнительная логика при отключении пользователя
// }

// function setupSocketLogging(io) {
//   io.on('connection', (socket) => {
//     logConnection(socket);
//     logConnectionUserData(socket)
//     socket.on('disconnect', () => {
//       logDisconnection(socket);
//     });
//     // Другие обработчики событий и логика
//   });
// }

