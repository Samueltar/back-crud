const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = 3000;
app.use(cors());
/*app.get('/',(req,res) => {
res.send('hello from my first backend server')
});*/

const FILE_PATH = './tasks.json';

async function getTasks(){
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}
async function saveTasks(tasks){
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}
 app.get('/api/tasks', async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

app.get('/api/tasks/:id', async (req, res) =>{
    const tasks = await getTasks();
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if(!task){
        return res.status(404).json({message: 'task not found'});
    }
    res.json(task);
});

 app.post('/api/tasks',async (req,res) =>{
    if(!req.body.title){
        return res.status(400).json({message: 'title is required'});}
    const tasks = await getTasks();
    const newTask ={
       id: tasks.length > 0 ? tasks[tasks.length -1].id + 1 : 1,
       title: req.body.title,
       completed: false
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    res.status(201).json(newTask);
 });

 app.put('/api/tasks/:id',async (req,res) => {
    const tasks = await getTasks();
    
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId)

    if(!task){
        return res.status(404).json({message: 'task not found'});
    }
    if(req.body.title !== undefined){
        task.title = req.body.title;
    }
    if(req.body.completed !== undefined){
        task.completed = req.body.completed;
    }
   await saveTasks(tasks);
   res.json(task);
 });

 app.delete('/api/tasks/:id',async (req,res) => {
    const tasks = await getTasks();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id ===taskId);

if(taskIndex === -1){
    return res.status(404).json({message: 'task not found'});
}
const deletedTask = tasks.splice(taskIndex , 1);
await saveTasks(tasks);
res.json({message: 'task deleted successfully ', task: deletedTask[0]});
 });
app.listen(PORT, () => {
    console.log('server is running at port: ${PORT}');
});