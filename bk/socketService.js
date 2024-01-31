'use strict'

const jwt = require('jsonwebtoken');
const logger = require('./utils/logger/logger');
require('dotenv').config();

let usersToPoll = []; console.log('Активных пользователй: ', usersToPoll)
// Функция для добавления нового пользователя в массив опроса
function addUserToPoll(userId) {
  console.log('addUserToPoll', userId)
  if (!usersToPoll.includes(userId)) {
    usersToPoll.push(userId);
  }
}

// Функция для удаления пользователя из массива опроса
function removeUserFromPoll(userId) {
  console.log('removeUserFromPoll', userId)
  usersToPoll = usersToPoll.filter(id => id !== userId);
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

function setupSocket(io) {
  io.use(authenticateSocket)
    .on('connection', (socket) => {
      socket.on('userConnect', (data) => {
        addUserToPoll(data.userId); //масиив с активными пользователями 
        socket.userId = data.userId;
        socket.join(data.userId)
        socket.join('allActiveUser');
        if (socket.decoded.role === 'chife') {
          socket.join('allChifeRoom')
        }
        if (socket.userData.user_sub_dep_id === 2) {
          socket.join('allHPRRoom')
        }
        socket.on('getMyRooms', () => {
          const rooms = Array.from(socket.rooms);
          socket.emit('yourRooms', rooms.filter(room => room !== socket.id));
        });
      })
      socket.on('disconnect', () => {
        if (socket.userId) {
          removeUserFromPoll(socket.userId);
        } else {
          console.error('socket.userId not available on disconnect.');
        }
      });
      socket.on('taskUpdated', (updatedTask) => {
        io.emit('taskDataChanged', {
          message: 'Данные задач были изменены'
        });
      });
    });
}

module.exports = {
  setupSocket
};