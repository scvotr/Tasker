const sqlite3 = require('sqlite3').verbose()
const db2 = new sqlite3.Database('../database2222.db')
const logger = require('../utils/logger/logger');
const { openConnection, closeConnection } = require('./utils/activeConnections/activeConnectionsCount ');

const executeDatabaseQueryAsync = async (command, params = [], method = 'all') => {
  logger.info(`Executing query: ${command} with params: ${JSON.stringify(params)}`);
  const db = openConnection('../database2222.db');
  // если не нужно отслеживать соединеия передать экзепляр new sqlite3.Database
  return new Promise((resolve, reject) => {
    db[method](command, params, (err, result) => {
      if (err) {
        logger.error(`Error executing query: ${err}`);
        reject(err);
      } else {
        resolve(result);
      }
      closeConnection(db); // Ensure connection is closed after query execution

    });
  });
};


const createTableTasksComments = async () => {
  try {
    await executeDatabaseQueryAsync(
      // command
      `CREATE TABLE IF NOT EXISTS task_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        user_id INTEGER,
        comment VARCHAR(255),
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(task_id) REFERENCES tasks(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
       )`, [])
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

const selecAllTasksComments = async() => {
  try {
    await executeDatabaseQueryAsync(
      `
      SELECT * FROM your_table_name
      `, []
    )
    .then((res) => {
      console.log(res)
    .catch((err) => {
      console.error(err)
    })  
    })
  } catch (error) {
    
  }
}

db2.serialize(async () => {
  createTableTasksComments()
})

module.exports = {
  executeDatabaseQueryAsync,
  selecAllTasksComments,
}
