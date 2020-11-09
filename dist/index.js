"use strict";

var _db = _interopRequireDefault(require("./config/db.config"));

var _app = _interopRequireDefault(require("./config/app.config"));

var _index = _interopRequireDefault(require("./routes/index.route"));

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();

(async () => {
  try {
    await _db.default.connect().then(() => {
      console.log('Mongodb conectado.');
      (0, _app.default)((0, _index.default)());
    }).catch(err => console.log(err.message));
    await _db.default.close();
  } catch (error) {
    console.error('Ocorreu algum erro na conexão com o banco.', error);
  }
})();