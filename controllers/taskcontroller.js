const db = require('../config/db');

exports.getAllTasks = (req, res) =>{
    try{
        let query = 'SELECT * FROM tasks';
        const params = [];
        const conditions = [];
    
    if(req.query.completed !== undefined){
         conditions.push('completed = ?');
        params.push(req.query.completed === 'true' ? 1 : 0);
    }

    if(req.query.search){
        conditions.push('title LIKE ?');
        params.push(`%${req.query.search}%`);
    }

    if(conditions.length>0){
        query += ' WHERE ' + conditions.join(' AND ');
    }
    const tasks = db.prepare(query).all(...params);
    res.json(tasks);
}  catch(error){
    res.status(500).json({message: 'error reading tasks from database', error: error.message});
}
};

exports.getTaskById = (req, res) => {
    try{
        const tasks = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
        if(!tasks){
            return res.status(404).json({message : 'Task with ${req.params.id} not found'});
    
        };
         res.json(tasks);
    }

    catch(error){
        res.status(500).json({message: 'error reading task from database', error: error.message});
    }
};

exports.createTask = (req, res) =>{
    try{
        if(!req.body.title || req.body.title.trim() === ''){
            return res.status(400).json({message: 'Task title is required'});
        };

        const title = req.body.title.trim();
        const completed = req.body.completed ? 1 : 0;

        const stmt = db.prepare('INSERT INTO tasks (title, completed) VALUES (?,?)');
        const result = stmt.run(title, completed);
        res.status(201).json({message: 'Task created successfully', task: {id: result.lastInsertRowid, title, completed}});

}
    catch(error){
        res.status(500).json({message: 'error creating task in database', error: error.message});
    }
};

exports.updateTask = (req, res) =>{
    try{
       const taskId = req.params.id; // ✅ req.params
        const existing = db.prepare('SELECT * FROM tasks WHERE id =? ').get(taskId);
      if (!existing) {
    return res.status(404).json({ message: 'Task not found' }); // ✅ Added return & 404
}

        const title = req.body.title !== undefined ? req.body.title.trim() : existing.title;
        const completed =req.body.completed !== undefined ? (req.body.completed ? 1 : 0) : existing.completed;
         db.prepare('UPDATE tasks SET title = ?, completed = ? WHERE id = ?').run(title, completed, taskId);
         res.json({ id: Number(taskId), title, completed });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};
   exports.deleteTask = (req, res) => {
    try {
        const taskId = req.params.id;
        const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
        if (!existing) {
            return res.status(404).json({ message: 'Task not found' });
        }
        db.prepare('DELETE FROM tasks WHERE id = ?').run(taskId);
        res.json({ message: 'Task deleted successfully', task: existing });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

