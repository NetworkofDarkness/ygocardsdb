"use strict";

var _handlers = require("./core/handlers");

var _handlers2 = _interopRequireDefault(_handlers);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

//app.set('json replacer', replacer); // property transformation rules
app.set('json spaces', 4); // number of spaces for indentation

app.use('/', _handlers2.default);

app.listen(3000, function () {
  return console.log('Listening on port 3000!');
});