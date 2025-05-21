import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import todoroutes from './routes/todo.route.js';
import todo from './models/todo-model.js'

const app = express();
dotenv.config();

// middleware
app.use(express.json());

app.use("/api/todos",todoroutes)

//  checking routing

// router.get('/check',(req,res)=>{
//         res.send("hello from node server");
//     })
    
 



app.listen(5000,()=>{
    connectDB()
    console.log("server stated")
})