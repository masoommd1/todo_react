import { text } from "express";
import mongoose from "mongoose";

const todoSchema = new  mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

constTodo = mongoose.model("todo",todoSchema);

export default Todo;