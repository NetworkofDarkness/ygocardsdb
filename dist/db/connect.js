'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');

var server = require('../config/db_config.json').dbServer;
var database = require('../config/db_config.json').dbName;

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);

    this.connect();
  }

  _createClass(Database, [{
    key: 'connect',
    value: function connect() {
      mongoose.connect('mongodb://' + server + '/' + database, { useNewUrlParser: true }).then(function () {
        console.log('Database connection successful');
      }).catch(function (err) {
        console.error('Database connection error');
      });
    }
  }]);

  return Database;
}();

module.exports = new Database();