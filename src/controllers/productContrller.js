import prisma from "../config/prismaClient.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const addProduct=asyncHandler(async (req,res)=>{
    const {name,description,categoryId,price,quantity}=req.body;
    if(!categoryId){
        throw new CustomError(`please provie category id`)
    }
    const existcategory=await prisma.categories.findFirst({where:{id:categoryId}});
    if(!existcategory){
        throw new CustomError(`category is not found `,404);
    }
    const product=await prisma.products.create({
        data:{
            name, 
            description,
            categoryId,
            price,
            quantity
        }
    });
    if(!product){
        throw new CustomError('product cant be  created ',400)
    }
    res.status(200).json({success:true,message:'product created successfully'})
   
})

export const getAllProduct=asyncHandler(async (req,res)=>{
 const  {page = 1,limit = 10,categoryId ,sort='desc'} = req.query;
 if(categoryId){
    const categoryexist=await prisma.categories.findFirst({where:{id:categoryId}});
    if(!categoryexist){
        throw new CustomError(`category is not found please provide a valid categoryId`,404)
    }
 }
    const pageNumber = parseInt(page );
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    if (pageNumber <= 0 || limitNumber <= 0) {
        throw new CustomError('Page and limit must be positive integers', 400);
    }
    const products=await prisma.products.findMany({
        where:{
            AND:[

                {categoryId},
                {isDeleted:false}
            ]
            
        },
        orderBy:{
            price:sort==='asc'?'asc':'desc'
        },
        skip,
        take:limitNumber
    });
    const totalProducts=await prisma.products.count({
        where:{
            AND:[

                {categoryId},
                {isDeleted:false}
            ]
        },
        orderBy:{
            price:sort==='asc'?'asc':'desc'
        },
})
    if(!products){
        throw new CustomError(`products not found`,404)
    }
    res.status(200).json({success:true,message:`products fetched successfully`,data:{products,totalProducts}});
   
})

export const getAProduct=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new CustomError(`please provide a valid product id`,400)
    }
    const product=await prisma.products.findFirst({where:{id}});
    if(!product){
        throw new CustomError(`product not found`,404)
    }
    const category=await prisma.categories.findFirst({where:{id:product.categoryId}})
    if(!category){
        throw new CustomError(`category of the product is not found`)
    }
    product.category=category;
    const {categoryId,...rest}=product;
    
    res.status(200).json({success:true,message:`product fetched successfully`,data:rest});
   
})

export const updateAProduct=asyncHandler(async (req,res)=>{
    const {name,description,price,quantity,categoryId}=req.body;
    const {id}=req.params;
    if(quantity){
        const existquantity=await prisma.categories.findFirst({where:{id:categoryId}})
        if(!existquantity){
            throw new CustomError(`category does not exist`);
        }
    }
    if(!id){
        throw new CustomError(`please provide a valid product id`,400)
    }
    const product=await prisma.products.findFirst({where:{id}});
    if(!product){
        throw new CustomError(`product not found`,404)
    }
    const updateproduct=await prisma.products.update({where:{id},data:{name,description,price,categoryId,quantity}})
    if(!updateproduct){
        throw new CustomError(`product cant be updated`,400);
    }
    res.status(200).json({success:true,message:`product updated successfully`});
   
})

export const deletAProduct=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new CustomError(`please provide a valid product id`,400)
    }
    const product=await prisma.products.findFirst({where:{id}});
    if(!product){
        throw new CustomError(`product not found`,404)
    }
    const deleteproduct=await prisma.products.update({where:{id},data:{isDeleted:true}})
    if(!deleteproduct){
        throw new CustomError(`product cant be deleted`,400);
    }
    res.status(200).json({success:true,message:`product deleted successfully`});
   
})

export const getProductsWithLowInventory=asyncHandler(async(req,res)=>{
    
    const {count=1}=req.query;
    
    const take=parseInt(count)
    const products=await prisma.products.findMany({where:{isDeleted:false},orderBy:{
        quantity:'asc'
    },take},

)
    res.status(200).json({success:true,message:'products with low inventory ftechhed successfully',data:products})
})
