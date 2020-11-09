"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

var _default = () => {
  // Registrando usuário
  router.post('/users/register', _user.default.register); // Autenticando usuário

  router.post('/users/login', _user.default.login);
  return router;
};

exports.default = _default;