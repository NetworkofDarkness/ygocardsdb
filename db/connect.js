let mongoose = require('mongoose');

const server = require('../config/db_config.json').dbServer;
const database = require('../config/db_config.json').dbName;

function connect() {
     return mongoose.createConnection(`mongodb://${server}/${database}`,{ useNewUrlParser: true })
  }

module.exports = connect();