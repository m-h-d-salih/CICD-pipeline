import express from 'express'
import { createValidator } from 'express-joi-validation'
import { productValidation } from '../validation/productValidation.js'
import { addProduct, deletAProduct, getAllProduct, getAProduct, getProductsWithLowInventory, updateAProduct } from '../controllers/productContrller.js'


const router =express.Router()
const validator=createValidator({passError:true})

router.get('/low-inventory',getProductsWithLowInventory);

router.route('').post(validator.body(productValidation),addProduct)
.get(getAllProduct)
router.route('/:id')
.get(getAProduct)
.put(updateAProduct)
.delete(deletAProduct);





export default router