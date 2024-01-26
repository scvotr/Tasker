'use strict'

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
    if(io){
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
  io.on('connection', (socket) => {
    socket.on('userConnect', (data) => {
      socket.userId = data.userId; // Сохраняем userId в объекте socket
      addUserToPoll(data.userId)
      console.log('Получены данные от клиента:', data);
      console.log('usersToPoll:', usersToPoll)
    })
    socket.on('disconnect', () => {
      if(socket.userId) {
        removeUserFromPoll(socket.userId); // Используем сохраненный userId
        console.log('Пользователь отключился', socket.userId);
        console.log('usersToPoll:', usersToPoll)
      } else {
        console.error('socket.userId not available on disconnect.');
      }
    });

    socket.on('taskUpdated', (updatedTask) => {
      // Обработка обновления задачи
      // ...

      // Отправляем уведомление через веб-сокет о том, что данные задач были изменены
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
