"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var express = _interopRequireWildcard(require("express"));

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const extensions = ['.ts', '.js'];
const route = express.Router();

var _default = () => {
  route.get('/', async (req, res) => {
    return res.status(200).send({
      message: 'API em Node.js | Desafio South System'
    });
  });
  fs.readdirSync(__dirname).filter(file => {
    return file.indexOf('.') !== 0 && file !== path.basename(__filename) && extensions.includes(file.slice(-3));
  }).forEach(file => {
    const fileRoute = require(path.join(__dirname, file));

    route.use(fileRoute.default());
  });
  return route;
};

exports.default = _default;