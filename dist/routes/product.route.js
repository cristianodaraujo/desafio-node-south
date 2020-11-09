"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));

var _admin = _interopRequireDefault(require("../middlewares/admin.middleware"));

var _product = _interopRequireDefault(require("../controllers/product.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

var _default = () => {
  router.route('/products') // Lista de produtos
  .get(_auth.default, _product.default.getProducts) // Criação de produto
  .post([_auth.default, _admin.default], _product.default.createProduct);
  router.route('/products/:id') // Buscar produto por id
  .get(_auth.default, _product.default.findProductById) // Atualizar produto por id
  .patch([_auth.default, _admin.default], _product.default.updateProduct) // Excluir produto por id
  .delete([_auth.default, _admin.default], _product.default.deleteProduct);
  return router;
};

exports.default = _default;