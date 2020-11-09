"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ProductModel = new _mongoose.Schema({
  name: {
    type: _mongoose.Schema.Types.String,
    required: true
  },
  price: {
    type: _mongoose.Schema.Types.Number,
    required: true
  },
  quantity: {
    type: _mongoose.Schema.Types.Number,
    required: true
  }
});

var _default = (0, _mongoose.model)('product', ProductModel);

exports.default = _default;