import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import todoroutes from './routes/todo.route.js';

const app = express();
dotenv.config();

// middleware
app.use(express.json());

app.use("/api/todos",todoroutes)

app.listen(5000,()=>{
    connectDB()
    console.log("server stated")
})