import app from "./src/app.js";
import dotenv from 'dotenv';

dotenv.config();
const port=process.env.PORT || 6000;


app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})
