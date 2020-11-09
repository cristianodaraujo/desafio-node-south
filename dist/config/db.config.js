"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = _interopRequireWildcard(require("mongoose"));

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();

const connect = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

const close = () => {
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('A conexão do Mongoose foi desconectada.');
      process.exit(0);
    });
  });
};

var _default = {
  connect,
  close
};
exports.default = _default;