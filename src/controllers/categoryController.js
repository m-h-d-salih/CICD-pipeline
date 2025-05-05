import prisma from "../config/prismaClient.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const addCategory=asyncHandler(async (req,res)=>{
    const {name,description}=req.body;
    const existcategory=await prisma.categories.findFirst({where:{name}});
    if(existcategory){
        throw new CustomError(`category already exist`,400);
    }
    const category=await prisma.categories.create({
        data:{
            name,
            description
        }
    });
    if(!category){
        throw new CustomError('category cant be  created ',400)
    }
    res.status(200).json({success:true,message:'category created successfully'})
   
})
export const getAllCategory=asyncHandler(async (req,res)=>{
    const categories=await prisma.categories.findMany({where:{isDeleted:false}});
    if(!categories){
        throw new CustomError(`categories not found`,404)
    }
    res.status(200).json({success:true,message:`categories fetched successfully`,data:categories});
   
})
export const getACategory=asyncHandler(async (req,res)=>{
    const {sort='desc',count=1}=req.query;
    const {id}=req.params;
    if(!id){
        throw new CustomError(`please provide a valid category id`,400)
    }
    const category=await prisma.categories.findFirst({where:{id}});
    if(!category){
        throw new CustomError(`category not found`,404);
    }
    const take=parseInt(count)
    const products=await prisma.products.findMany({where:{categoryId:id},
    orderBy:{
        price:sort==='desc'?'desc':'asc'
    },
    take
    });
    category.products=products
    res.status(200).json({success:true,message:`category fetched successfully`,data:category});
   
})
export const updateACategory=asyncHandler(async (req,res)=>{
    const {name,description}=req.body;
    const {id}=req.params;
    if(!id){
        throw new CustomError(`please provide a valid category id`,400)
    }
    const category=await prisma.categories.findFirst({where:{id}});
    if(!category){
        throw new CustomError(`category not found`,404)
    }
    const updateCategory=await prisma.categories.update({where:{id},data:{name,description}})
    if(!updateCategory){
        throw new CustomError(`category cant be updated`,400);
    }
    res.status(200).json({success:true,message:`Category updated successfully`});
   
})
export const deletACategory=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new CustomError(`please provide a valid category id`,400)
    }
    const category=await prisma.categories.findFirst({where:{id}});
    if(!category){
        throw new CustomError(`category not found`,404)
    }
    const deleteCategory=await prisma.categories.update({where:{id},data:{isDeleted:true}})
    if(!deleteCategory){
        throw new CustomError(`category cant be deleted`,400);
    }
    res.status(200).json({success:true,message:`Category deleted successfully`});
   
})

export const getExpensiveProdcutByCategory=asyncHandler(async(req,res)=>{
    const categories=await prisma.categories.findMany({where:{isDeleted:false}});
    const result=[]
    for(let item of categories){
        const product=await prisma.products.findFirst({where:{categoryId:item.id},orderBy:{price:'desc'}});
        result.push({category:item.name,...product})
    }
    res.status(200).json({success:true,message:`most expensive product by category`,result})
})