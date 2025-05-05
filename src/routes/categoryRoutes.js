import express from 'express'
import { createValidator } from 'express-joi-validation'
import { categoryValidation } from '../validation/categoryValidation.js'
import { addCategory, deletACategory, getACategory, getAllCategory, getExpensiveProdcutByCategory, updateACategory } from '../controllers/categoryController.js'

const router =express.Router()
const validator=createValidator({passError:true})


router.get('/mostexpensive-category',getExpensiveProdcutByCategory)
router.route('').post(validator.body(categoryValidation),addCategory)
.get(getAllCategory);
router.route('/:id').get(getACategory)
.put(updateACategory)
.delete(deletACategory)


export default router