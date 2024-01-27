const { executeDatabaseQueryAsync } = require('../utils/activeConnections/activeConnectionsCount')

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

  module.exports = {
    createTableTasksComments
  }