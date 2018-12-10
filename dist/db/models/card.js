"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; //Create new Card


var cardSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String },
    atk: { type: String },
    def: { type: String },
    type: { type: String },
    level: { type: String },
    race: { type: String },
    attribute: { type: String },
    scale: { type: String },
    linkval: { type: String },
    linkmarkers: [{ type: String }],
    archetype: { type: String },
    setcode: { type: String },
    ban_tcg: { type: String },
    ban_ocg: { type: String },
    ban_goat: { type: String }
});

exports.default = _mongoose2.default.model('Card', cardSchema);