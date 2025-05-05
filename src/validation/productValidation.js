import Joi from 'joi';
export const productValidation = Joi.object({
   
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    price:Joi.number().min(1).required(),
    quantity:Joi.number().min(1).required(),
    categoryId:Joi.string().min(3).max(50).required()
  });