import mongoose from 'mongoose';
import createError from 'http-errors';
import Product from './../models/product.model';
import ProductSchema from './../schemas/product.shema';
import { Request, Response, NextFunction } from 'express';
import ProductInterface from './../interfaces/product.interface';

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    const search = req.query.name ? { 
      name: { '$regex': req.query.name } 
    } : {};

    let results = await Product.find(search as string[], { __v: 0 }).skip(skip).limit(limit);

    if (Number(req.query.available)) {
      results = results.filter((product: ProductInterface) => product.quantity);
    }

    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductSchema.validateAsync(req.body);
    const product: ProductInterface = new Product(result);
    const savedProduct = await product.save();

    res.send(savedProduct);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    } else if (error.isJoi === true) error.status = 422
    next(error);
  }
};

const findProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product: ProductInterface = await Product.findById(id);

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

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product: ProductInterface = await Product.findByIdAndUpdate(id, req.body, { new: true });

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

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product: ProductInterface = await Product.findByIdAndDelete(id);

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

export default {
  getProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct
}
