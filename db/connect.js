let mongoose = require('mongoose');

const server = require('../config/db_config.json').dbServer;
const database = require('../config/db_config.json').dbName;
class Database {
connect() {
      mongoose.Promise = global.Promise;
      return mongoose.createConnection(`mongodb://${server}/${database}`,{ useNewUrlParser: true })
      .on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

}
module.exports = Database;