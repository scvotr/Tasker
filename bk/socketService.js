'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

let usersToPoll = [];
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

// Функция для опроса базы данных и обнаружения изменений в данных задач пользователя по его ID
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

function setupSocket(io) {
  io.use((socket, next) => {
    let token = socket.handshake.query.token; //из строки запроса
    let tokenInHeaders = socket.handshake.headers.authorization; //из заголовков авторизации
    if(tokenInHeaders) {
      tokenInHeaders = tokenInHeaders.slice(7, tokenInHeaders.length);
      jwt.verify(tokenInHeaders, process.env.KEY_TOKEN, (err, decoded) => {
        if (err) return next(new Error('Authentication error'))
        socket.decoded = decoded
        next()
      })
    } else {
      next(new Error('Authentication error'))
    }  
  }).on('connection', (socket) => { 
    console.log('connection -> socket.decoded >>>>', socket.decoded)
    socket.on('userConnect', (data) => {
      console.log('Получены данные от клиента:', data);
      // Сохраняем userId пользователя в объект socket
      socket.userId = data.userId;
      // Добавляем пользователя в пул пользователей (предполагается, что это функция для управления пользователями)
      addUserToPoll(data.userId); console.log('usersToPoll:', usersToPoll)
      // Добавляем пользователя в комнату
      socket.join('allActiveUser'); 
      if(socket.decoded.role === 'chife') {
        socket.join('allChifeRoom')
      }
      // Добавляем новый обработчик события для запроса списка комнат
      socket.on('getMyRooms', () => {
        // В этом примере предполагается, что socket.rooms возвращает Set комнат, к которым подключен сокет
        const rooms = Array.from(socket.rooms);
        // Отправляем клиенту список его комнат, исключая его собственный socket.id
        socket.emit('yourRooms', rooms.filter(room => room !== socket.id));
      });
    })
    // Обработчик события отключения пользователя
    socket.on('disconnect', () => {
      // Проверяем, сохранен ли userId в socket
      if (socket.userId) {
        // Если userId есть, удаляем пользователя из пула
        removeUserFromPoll(socket.userId);
        // Выводим в консоль сообщение об отключении пользователя и текущий список пользователей
        console.log('Пользователь отключился', socket.userId);
        console.log('usersToPoll:', usersToPoll)
      } else {
        // В случае отсутствия userId выводим ошибку
        console.error('socket.userId not available on disconnect.');
      }
    });
    // Обработчик события обновления задачи
    socket.on('taskUpdated', (updatedTask) => {
      // ... Здесь может быть код обработки обновления задачи
      // Отправляем сообщение всем подключенным пользователям о том, что данные задачи были изменены
      io.emit('taskDataChanged', {
        message: 'Данные задач были изменены'
      });
    });
  });
}

module.exports = { setupSocket, pollDatabaseForUserTasks };





// const socketIo = require('socket.io');
// const server = http.createServer(app);
// const io = socketIo(server);

// // Инициализация пустого массива для хранения ID пользователей, которые нужно опрашивать
// let usersToPoll = [];

// // Функция для опроса базы данных и обнаружения изменений в данных задач пользователя по его ID
// async function pollDatabaseForUserTasks(userId) {
//   try {
//     const userTasks = await getAllUserTasks(userId); // Замените это на вашу функцию запроса к базе данных для получения задач пользователя по его ID

//     // Отправляем уведомление через веб-сокет о новых данных задач пользователя
//     io.to(userId).emit('tasksUpdated', userTasks);
//   } catch (error) {
//     console.error(`Error while polling tasks for user with ID ${userId}:`, error);
//   }
// }

// // Функция для добавления нового пользователя в массив опроса
// function addUserToPoll(userId) {
//   if (!usersToPoll.includes(userId)) {
//     usersToPoll.push(userId);
//   }
// }

// // Функция для удаления пользователя из массива опроса
// function removeUserFromPoll(userId) {
//   usersToPoll = usersToPoll.filter(id => id !== userId);
// }

// // Обработчик подключения нового пользователя через сокет
// io.on('connection', (socket) => {
//   const userId = socket.userId; // Предположим, что у вас есть способ определить ID пользователя при подключении

//   // Добавляем пользователя в массив опроса
//   addUserToPoll(userId);

//   // Обработчик отключения пользователя
//   socket.on('disconnect', () => {
//     // Удаляем пользователя из массива опроса при отключении
//     removeUserFromPoll(userId);
//   });
// });

// // Цикл для опроса базы данных для каждого пользователя через пулинг
// const pollingInterval = 5000; // Интервал опроса в миллисекундах

// setInterval(() => {
//   usersToPoll.forEach((userId) => {
//     pollDatabaseForUserTasks(userId);
//   });
// }, pollingInterval);
