"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = _interopRequireWildcard(require("mongoose"));

var createError = _interopRequireWildcard(require("http-errors"));

var _product = _interopRequireDefault(require("../models/product.model"));

var _product2 = _interopRequireDefault(require("../schemas/product.shema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getProducts = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    const search = req.query.name ? {
      name: {
        '$regex': req.query.name
      }
    } : {};
    let results = await _product.default.find(search, {
      __v: 0
    }).skip(skip).limit(limit);

    if (Number(req.query.available)) {
      results = results.filter(product => product.quantity);
    }

    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const result = await _product2.default.validateAsync(req.body);
    const product = new _product.default(result);
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    console.log(error.message);

    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    } else if (error.isJoi === true) error.status = 422;

    next(error);
  }
};

const findProductById = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const product = await _product.default.findById(id);

    if (!product) {
      throw createError(404, 'Produto não existe.');
    }

    res.send(product);
  } catch (error) {
    console.log(error.message);

    if (error instanceof mongoose.Error) {
      next(createError(400, 'ID de produto inválido.'));
      return;
    }

    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const product = await _product.default.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!product) {
      throw createError(404, 'Produto não existe.');
    }

    res.send(product);
  } catch (error) {
    console.log(error.message);

    if (error instanceof mongoose.Error) {
      return next(createError(400, 'ID de produto inválido.'));
    }

    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const product = await _product.default.findByIdAndDelete(id);

    if (!product) {
      throw createError(404, 'Produto não existe.');
    }

    res.send(product);
  } catch (error) {
    console.log(error.message);

    if (error instanceof mongoose.Error) {
      next(createError(400, 'ID de produto inválido.'));
      return;
    }

    next(error);
  }
};

var _default = {
  getProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct
};
exports.default = _default;