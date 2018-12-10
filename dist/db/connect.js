'use strict';

var mongoose = require('mongoose');

var server = require('../config/db_config.json').dbServer;
var database = require('../config/db_config.json').dbName;

function connect() {
     return mongoose.createConnection('mongodb://' + server + '/' + database, { useNewUrlParser: true });
}

module.exports = connect();