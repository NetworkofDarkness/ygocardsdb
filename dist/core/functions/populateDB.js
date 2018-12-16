"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

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
            _axios2.default.get("https://db.ygoprodeck.com/api/v2/cardinfo.php").then(function (response) {

                database.connect().then(function (conn) {
                    var Card = conn.model('card', _card2.default);
                    Card.insertMany(response.data[0]).then(function () {
                        return console.log("Insert Response Succesfully to " + Card.collection.collectionName);
                    }).catch(function (error) {
                        return console.log(error);
                    });
                }).then(function (result) {
                    return console.log("Create cards succesfully");
                }).catch(function (err) {
                    return console.log("Error: ", err);
                });
            });
        }
    }]);

    return populateDB;
}();

exports.default = populateDB;