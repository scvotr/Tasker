const logger = require('../../../utils/logger/logger')
const sqlite3 = require('sqlite3').verbose();

let activeConnectionsCount = 0;

const openConnection = (dbPath) => {
  logger.info(`Trying to open connection. Active connections before opening: ${activeConnectionsCount}`);
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      logger.error(`Error opening connection: ${err}`);
    } else {
      activeConnectionsCount++;
      logger.info(`Connection successfully opened. Active connections: ${activeConnectionsCount}`);
    }
  });
  return db;
};

const closeConnection = (db) => {
  db.close((err) => {
    if (err) {
      logger.error(`Error closing connection: ${err}`);
    } else {
      activeConnectionsCount--;
      logger.info(`Connection closed. Active connections: ${activeConnectionsCount}`);
    }
  });
};

module.exports = {
    openConnection,
    closeConnection,
}