let mongoose = require('mongoose');

const server = require('../config/db_config.json').dbServer;
const database = require('../config/db_config.json').dbName;
class Database {
  constructor() {
    this.connect()
  }
connect() {
     mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()