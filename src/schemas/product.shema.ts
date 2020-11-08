import * as Joi from '@hapi/joi';

const ProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

export default ProductSchema;
