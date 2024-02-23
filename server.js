const express = require('express');
const TaskSchema = require('./model')
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin:'*'
}))

mongoose.connect('mongodb+srv://sudhakargudavallis7:sudhakar@cluster0.lrguhk6.mongodb.net/').then(
    {
useNewUrlParser:true,
useUnifiedTopology:true
    }).then(
    ()=>console.log('db connected') 
).catch(err=>console.log(err))


app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{

        const newData = new TaskSchema({
            todo : todo
         })
         await newData.save();
         const tasks = await TaskSchema.find();
         return res.json(tasks);
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal"});
    }
})
app.get('/gettask', async(req,res)=>{
   try{
    const tasks = await TaskSchema.find();
    return res.json(tasks);
   }catch(err){
    console.log(err);
   }
})
app.delete('/delete/:id', async(req,res)=>{
    try{
await TaskSchema.findByIdAndDelete(req.params.id);
return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err);
    }
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
