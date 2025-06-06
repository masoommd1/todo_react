import express from 'express';
import Todo from '../models/todo-model.js';

const router = express.Router();
// app.use(express.json());


// get all todos

router.get('/',async(req,res)=>{
try {
    const todo = await Todo.find();
    res.json(todo);
} catch (error) {
    res.status(500).json({msg:error.msg})
}
})

// add a new todo

router.post('/', async (req,res)=>{
     console.log('POST body:', req.body);  
    const  todo = new Todo({
    text:req.body.text
    })

    try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
    } catch (error) {
    res.status(500).json({msg:error.msg})
}
});

// update todo

router.patch('/:id',async(req,res)=>{
    
    try {
    const todo = await  Todo.findById(req.params.id);
     if(!todo){
        return res.status(500).json({msg:'Todo not found!'})
     } 
     
     if(req.body.text !== undefined){
        todo.text = req.body.text;
     } 
     
     if(req.body.completed !== undefined){
        todo.completed = req.body.completed;  
     } 
     
     const updatedTodo = await todo.save();
     res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({msg:err.msg});
    }
})

// delte todos

router.delete('/:id',async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({msg:'todo deleted'})
    } catch (err) {
        res.status(500).json({msg:err.msg})
    }
})

export default router;