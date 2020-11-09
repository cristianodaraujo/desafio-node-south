"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createError = _interopRequireWildcard(require("http-errors"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError('Token não fornecido.'));
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(token, process.env.APP_SECRET);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (error) {
    return next(createError(401, 'Token inválido.'));
  }
};

exports.default = _default;