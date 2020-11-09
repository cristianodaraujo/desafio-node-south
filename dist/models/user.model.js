"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var bcrypt = _interopRequireWildcard(require("bcrypt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UserModel = new _mongoose.Schema({
  email: {
    type: _mongoose.Schema.Types.String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: _mongoose.Schema.Types.String,
    required: true
  },
  role: {
    type: _mongoose.Schema.Types.String,
    enum: ['admin', 'client'],
    lowercase: true,
    default: 'client'
  }
});
UserModel.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const genSalt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, genSalt);
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserModel.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

var _default = (0, _mongoose.model)('user', UserModel);

exports.default = _default;