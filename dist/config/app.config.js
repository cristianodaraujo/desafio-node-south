"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createError = _interopRequireWildcard(require("http-errors"));

var express = _interopRequireWildcard(require("express"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import * as cors from 'cors';
const app = express();

var _default = route => {
  // app.use(cors());
  app.use(express.json({
    limit: '50mb'
  }));
  app.use(express.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(route); // 404 handler && pass to error handler

  app.use((req, res, next) => {
    next(createError(404, 'Not found'));
  }); // Error handler

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server started...');
  });
  return app;
};

exports.default = _default;