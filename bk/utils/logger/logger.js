const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Устанавливаем уровень логирования
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Вывод в консоль
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Запись ошибок в файл error.log
    new winston.transports.File({ filename: 'combined.log' }) // Запись всех уровней в файл combined.log
  ]
});

module.exports = logger;

// Примеры записи сообщений различных уровней
// logger.error('Это сообщение об ошибке');
// logger.warn('Это предупреждение');
// logger.info('Это информационное сообщение')
