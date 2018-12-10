"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _populateDB = require("../functions/populateDB");

var _populateDB2 = _interopRequireDefault(_populateDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var populate = new _populateDB2.default();

router.get("/", function (req, res) {
    populate.run();
    res.send("Hello World");
});

exports.default = router;