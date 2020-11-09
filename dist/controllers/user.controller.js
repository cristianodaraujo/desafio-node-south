"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createError = _interopRequireWildcard(require("http-errors"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _user2 = _interopRequireDefault(require("../schemas/user.shema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const register = async (req, res, next) => {
  try {
    const result = await _user2.default.validateAsync(req.body);
    const user = new _user.default(result);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = await _user2.default.validateAsync(req.body);
    const user = await _user.default.findOne({
      email
    });

    if (!user) {
      throw createError(404, 'Usuário não registrado.');
    }

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      throw createError(401, 'Senha inválida.');
    }

    const secret = String(process.env.APP_SECRET);
    const payload = {
      id: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });
    res.send({
      token
    });
  } catch (error) {
    if (error.isJoi === true) return next(createError(400, 'Usuário ou senha inválidos.'));
    next(error);
  }
};

var _default = {
  register,
  login
};
exports.default = _default;