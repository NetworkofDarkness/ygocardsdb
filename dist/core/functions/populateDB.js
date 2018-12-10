"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connect = require("../../db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _card = require("../../db/schemas/card");

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database = new _connect2.default();

var populateDB = function () {
    function populateDB() {
        _classCallCheck(this, populateDB);
    }

    _createClass(populateDB, [{
        key: "run",
        value: function run() {
            database.connect().then(function (conn) {
                var Card = conn.model('card', _card2.default);
                var sample = new Card({ name: 'Dark Magician' });
                sample.save().then(function () {
                    return console.log('meow');
                });
            });
        }
    }]);

    return populateDB;
}();

exports.default = populateDB;