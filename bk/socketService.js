'use strict'

const jwt = require('jsonwebtoken');
const logger = require('./utils/logger/logger');
require('dotenv').config();

let usersCacheFromSocketConnects = [];
// Функция для добавления нового пользователя в массив опроса
function addUserInCache(userId) {
  console.log('addUserInCache', userId)
  if (!usersCacheFromSocketConnects.includes(userId)) {
    usersCacheFromSocketConnects.push(userId);
    console.log('Активных пользователй: ', usersCacheFromSocketConnects)
  }
}

// Функция для удаления пользователя из массива опроса
function removeUserFromCache(userId) {
  console.log('removeUserFromCache', userId)
  usersCacheFromSocketConnects = usersCacheFromSocketConnects.filter(id => id !== userId);
  console.log('Активных пользователй: ', usersCacheFromSocketConnects)
}

//? Функция для опроса базы данных и обнаружения изменений в данных задач пользователя по его ID
async function pollDatabaseForUserTasks(userId) {
  try {
    if (io) {
      const userTasks = await TasksControler.getAllUserTasks({
        params: {
          userId
        }
      }); // Вызываем контроллер для получения задач пользователя
      // Отправляем уведомление через веб-сокет о новых данных задач пользователя
      io.to(userId).emit('tasksUpdated', userTasks);
    } else {
      console.error('Socket.IO not initialized. Cannot poll database.')
    }
  } catch (error) {
    console.error(`Error while polling tasks for user with ID ${userId}:`, error);
  }
}

function authenticateSocket(socket, next) {
  let token = socket.handshake.query.token;
  let tokenInHeaders = socket.handshake.headers.authorization;
  if (tokenInHeaders) {
    tokenInHeaders = tokenInHeaders.slice(7, tokenInHeaders.length);
    jwt.verify(tokenInHeaders, process.env.KEY_TOKEN, (err, decoded) => {
      if (err) {
        logger.errorAuth({
          message: 'Authentication failed: invalid token',
          token: tokenInHeaders
        });
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      logger.infoAuth({
        message: 'Authentication successful',
        decode: socket.decoded.name
      });
      return next();
    });
  } else {
    logger.warn({
      message: 'Authentication failed: token is missing'
    });
    return next(new Error('Authentication error'));
  }
}
// ----------------------------------------
function setupSocket(io) {
  io.use(authenticateSocket)
    .on('connection', (socket) => {
      addUserInCache(socket.decoded.id)

      socket.join('allActiveUser')
      socket.join('user_' + socket.decoded.id) //?для каждого пользователя
      socket.join('dep_' + socket.decoded.department_id) //? для каждого подразделения
      socket.join('subDep_' + socket.decoded.subdepartment_id) //? для каждого отдела

      if (socket.decoded.role === 'chife') {
        let leadRoomName = 'leadSubDep_' + socket.decoded.subdepartment_id
        socket.join(leadRoomName)
        // Обработчик события для комнаты leadRoomName
        socket.on('newMessage', (message) => {
          // Это пример, внутренняя логика зависит от вашего предназначения
          io.to(leadRoomName).emit('messageReceived', message);
        });
      }

      socket.on('getMyRooms', () => {
        const allRooms = Array.from(socket.rooms)
        socket.emit('yourRooms',
          allRooms.filter((room) => room !== socket.id)
        )
      })
      socket.on('disconnect', () => {
        removeUserFromCache(socket.decoded.id)
      })
      socket.on('error', (error) => {
        console.error('Произошла ошибка сокета для пользователя с ID:', socket.decoded.id, error);
      });
    })
}

module.exports = {
  setupSocket,
  usersCacheFromSocketConnects,
};


// function setupSocket(io) {
//   io.use(authenticateSocket)
//     .on('connection', (socket) => {
//       socket.on('userConnect', (data) => {
//         addUserInCache(data.userId); //масиив с активными пользователями 
//         socket.userId = data.userId;
//         socket.join(data.userId)
//         socket.join('allActiveUser');
//         if (socket.decoded.role === 'chife') {
//           socket.join('allChifeRoom')
//         }
//         if (socket.userData.user_sub_dep_id === 2) {
//           socket.join('allHPRRoom')
//         }
//         socket.on('getMyRooms', () => {
//           const rooms = Array.from(socket.rooms);
//           socket.emit('yourRooms', rooms.filter(room => room !== socket.id));
//         });
//       })
//       socket.on('disconnect', () => {
//         if (socket.userId) {
//           removeUserFromCache(socket.userId);
//         } else {
//           console.error('socket.userId not available on disconnect.');
//         }
//       });
//       socket.on('taskUpdated', (updatedTask) => {
//         io.emit('taskDataChanged', {
//           message: 'Данные задач были изменены'
//         });
//       });
//     });
// }