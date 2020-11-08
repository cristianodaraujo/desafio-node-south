import * as createError from 'http-errors';
import * as mongoose from 'mongoose';
import Product from '@models/product.model';
import { Request, Response, NextFunction } from 'express';

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Product.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
};

const findProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    // const product = await Product.findOne({ _id: id });
    if (!product) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.Error) {
      next(createError(400, 'Invalid Product id'));
      return;
    }
    next(error);
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Product does not exist');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.Error) {
      return next(createError(400, 'Invalid Product Id'));
    }

    next(error);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.Error) {
      next(createError(400, 'Invalid Product id'));
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
