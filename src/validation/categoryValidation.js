import Joi from 'joi';
export const categoryValidation = Joi.object({
   
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
   
  });