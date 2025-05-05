import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);

app.use(errorHandler)
export default app;