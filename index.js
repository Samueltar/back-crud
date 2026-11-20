const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/',(req,res) => {
res.send('hello from my first backend server')
});
let tasks = [
    {id:1, title: 'Learn Node.js', completed: true},
    {id: 2, title: 'build atask manager api', completed: false},
    {id: 3, title: 'connect backend to frontend', completed: false}
];

 app.get('/api/tasks', (req,res) => {
    res.json(tasks);
 });
 app.get('/api/tasks/:id', (req,res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if(!task){
      return res.status(404).json({message: 'task not found'});
    }

     return res.json(task);
 })

 app.post('/api/tasks', (req,res) =>{
    if(!req.body.title){
        return res.status(400).json({message: 'title is required'});}
    const newTask ={
        id: tasks.length + 1,
        title: req.body.title,
        completed :false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
 });
 app.put('/api/tasks/:id', (req,res) => {
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
    res.json(task);
 });

 app.delete('/api/tasks/:id', (req,res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id ===taskId);

if(taskIndex === -1){
    return res.status(404).json({message: 'task not found'});
}
const deletedTask = tasks.splice(taskIndex , 1);
res.json({message: 'task deleted successfully ', task: deletedTask[0]});
 });
app.listen(PORT, () => {
    console.log('server is running at port: ${PORT}');
});