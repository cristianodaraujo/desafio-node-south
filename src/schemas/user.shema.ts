import * as Joi from '@hapi/joi';

const UserSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    role: Joi.string().lowercase()
});

export default UserSchema;
