const { openConnection, closeConnection } = require('../utils/activeConnections/activeConnectionsCount');

const executeDatabaseQueryAsync = async (command, params = [], method = 'all') => {
    logger.info(`Executing query: ${command} with params: ${JSON.stringify(params)}`);
    const db = openConnection('../v2database.db');
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

  module.exports = {
    executeDatabaseQueryAsync,
  }